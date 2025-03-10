import { protect } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/Sign-Up-Card";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = async () => {
  const user = await protect();

  if (user) redirect("/");

  return <SignUpCard />;
};

export default SignUpPage;
