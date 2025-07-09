import { ShipWheelIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { SIGNUPMODEL } from "../interface/auth";
import { isAxiosError } from "axios";
import useSignup from "../hooks/useSignup";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState<SIGNUPMODEL>({
    fullName: "",
    email: "",
    password:""
  });
  const {error,isPending,signupMutaion} = useSignup();
  
  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutaion(signupData)
  };
  
  return (
    <div
      data-theme="forest"
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div
        className="border border-primary/25 flex flex-col lg:flex-row w-full
      max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden"
      >
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span
              className="text-3xl font-bold font-mono bg-clip-text text-transparent
              bg-gradient-to-r from-primary to-secondary tracking-wider"
            >
              Streamify
            </span>
          </div>
          {/* Error message if any */}
          {error && (
            <div className="alert alert-error">
              <span>
                {isAxiosError(error) && error.response?.data?.message
                  ? String(error.response.data.message).replace(/"/g, "")
                  : "Something went wrong. Please try again."}
              </span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p>
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label" htmlFor="fullName">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label" htmlFor="email">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="hello@example.com"
                      required
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label" htmlFor="password">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      required
                      className="input input-bordered w-full"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label
                      htmlFor="checkbox"
                      className="label cursor-pointer justify-start gap-2"
                    >
                      <input
                        id="checkbox"
                        name="checkbox"
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms and Service{" "}
                        </span>
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>

                  <button className="btn btn-primary w-full" type="submit">
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs" />
                        Loading...
                      </>
                    ) : ("Create Account")
                      }
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* SIGNUP FORM - Right SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/signup.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connet with lanuage partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversation, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
