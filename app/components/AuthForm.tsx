"use client";

import { useState, useTransition } from "react";

type AuthFormProps = {
  action: (formData: FormData) => Promise<{ error: string } | void>;
  isRegister?: boolean;
};

export const AuthForm = ({ action, isRegister = false }: AuthFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form action={handleSubmit} className="w-full space-y-4">
      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950 text-sm text-red-400 p-3">
          {error} Error Text
        </div>
      )}
      {isRegister && (
        <div>
          <label
            htmlFor="name"
            className="text-gray-300 text-sm font-medium mb-2 block"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full text-white bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-50 transition-colors focus:border-black focus:outline-none rounded-lg"
            placeholder="Enter your name"
            autoComplete="off"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="text-gray-300 text-sm font-medium mb-2 block"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full text-white bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-50 transition-colors focus:border-black focus:outline-none rounded-lg"
          placeholder="Enter your email"
          autoComplete="off"
        />
      </div>
      <div>
        <label
          htmlFor="name"
          className="text-gray-300 text-sm font-medium mb-2 block"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          className="w-full text-white bg-gray-900 border border-gray-700 px-4 py-3 placeholder-gray-50 transition-colors focus:border-black focus:outline-none rounded-lg"
          placeholder="Enter your password"
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg text-black bg-white px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? "Loading..." : isRegister ? "Sign up" : "Sign in"}
      </button>
    </form>
  );
};
