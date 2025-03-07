"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" height={50} width={100} alt="logo" />
          <div className="flex items-center gap-2">
            <Button variant={"secondary"}>
              {pathName === "/sign-up" ? (
                <Link href="/sign-in">Log In</Link>
              ) : (
                <Link href="/sign-up">Sign Up</Link>
              )}
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
