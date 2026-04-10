import React from "react";

import { AuthForm } from "@/app/components/AuthForm";
import { signup } from "@/app/actions/auth";
import Link from "next/link";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 dark:bg-black">
      <div className="w-full max-w-md space-y-8 ">
        <div className="text-center text-white">
          <h1 className="text-3xl font-semibold">Sign up</h1>
          <p className="mt-2 text-sm">Create your account to get started</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
          <AuthForm action={signup} isRegister />
          <div className="text-sm text-center mt-6">
            <span className="text-gray-400">already have an account? </span>
            <Link href={"/login"} className="font-medium text-white underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
