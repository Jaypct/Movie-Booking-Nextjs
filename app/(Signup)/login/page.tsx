import React from "react";

import { AuthForm } from "@/app/components/AuthForm";
import { signin } from "@/app/actions/auth";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 dark:bg-black">
      <div className="w-full max-w-md space-y-8 ">
        <div className="text-center text-white">
          <h1 className="text-3xl font-semibold">Sign In</h1>
          <p className="mt-2 text-sm">
            Welcome back please sign in to your account
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
          <AuthForm action={signin} />
          <div className="text-sm text-center mt-6">
            <span className="text-gray-400">Don't have an account? </span>
            <Link
              href={"/register"}
              className="font-medium text-white underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
