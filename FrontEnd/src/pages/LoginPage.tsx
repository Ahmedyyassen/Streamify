import { ShipWheelIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { LOGINMODEL } from "../interface/auth";
import { isAxiosError } from "axios";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LOGINMODEL>({
    email: "",
    password:""
  });
  const {error,isPending,loginMutaion} = useLogin();
  
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutaion(loginData)
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
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p>Sign in to your account to continue your language journey</p>
                </div>

                <div className="space-y-3">
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
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
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
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button className="btn btn-primary w-full" type="submit">
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link
                        to={"/signup"}
                        className="text-primary hover:underline"
                      >
                        Create one
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

export default LoginPage;
