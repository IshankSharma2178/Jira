import { protect } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/Sign-In-Card";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const user = await protect();

  if (user) redirect("/");

  return <SignInCard />;
};

export default SignInPage;
