import { useState, type FormEvent } from "react";
import useAuthUser from "../hooks/useAuthUser"
import type { ONBOARINGFORM } from "../interface/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboading } from "../lib/api";
import toast from "react-hot-toast";
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants/language";
import { isAxiosError } from "axios";

const OnBoarding = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState<ONBOARINGFORM>({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });
  
    const {mutate:onboardingMutation, isPending} = useMutation({
      mutationFn: completeOnboading,
      onSuccess:()=>{
        toast.success("Profile onboarded successfully");
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      },
      onError:(error)=>{
        const message= isAxiosError(error) && error.response?.data?.message
                          ? String(error.response.data.message).replace(/"/g, "")
                          : "Something went wrong. Please try again."
        toast.error(message);
      }
    })
    const handleRandomAvatar = ()=>{
      const index = Math.floor(Math.random() * 100) + 1;
      const avatar = `https://avatar.iran.liara.run/public/${index}.png`;
      setFormState({...formState, profilePic: avatar});
      toast.success("Random profile picture generated!");
    }

    const handleFormSubmit =(e: FormEvent)=> {
      e.preventDefault();
      onboardingMutation(formState);
    }
  return (
    <div 
    className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8 ">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete your profile
          </h1>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="profile preivew"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/* GENERATE RANDOM AVATAR BIN */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label" htmlFor="fullName">
                <span className="label-text">Full Name</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                type="text"
                placeholder="Your Full Name"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label htmlFor="bio" className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                placeholder="Tell others about yourself and your language learning goals"
                required
                className="textarea textarea-bordered h-24 w-full "
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label" htmlFor="nativeLanguage">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  id="nativeLanguage"
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  required
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select you're native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label" htmlFor="learningLanguage">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  id="learningLanguage"
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  required
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select you're learning language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* LOCATION */}
            <div className="form-control">
              <label htmlFor="location" className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon
                  className="absolute top-1/2 -translate-y-1/2 transform left-3 size-5
                text-base-content opacity-70 z-10"
                />
                <input
                  id="location"
                  name="location"
                  value={formState.location}
                  type="text"
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  placeholder="City, Country"
                  required
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending}
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OnBoarding