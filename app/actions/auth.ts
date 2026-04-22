"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export const signin = async (formData: FormData) => {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const signup = async (formData: FormData) => {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const signout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
};

export const getUserData = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      isAuthenticated: false,
      userName: "User",
      role: null,
    };
  }

  const userName = user.user_metadata?.name || "User";

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  return {
    isAuthenticated: true,
    userName,
    role: profile?.role,
  };
};
