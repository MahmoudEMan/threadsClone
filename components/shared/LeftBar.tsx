"use client";
import { sidebarLinks } from "@/constants";
console.log("🚀 ~ file: LeftBar.tsx:3 ~ sidebarLinks:", sidebarLinks);
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MutatingDots } from "react-loader-spinner";

import {
  SignOutButton,
  SignedIn,
  SignedOut,
  useAuth,
  ClerkLoading,
} from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
const LeftBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const { userId } = useAuth();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${
                isActive ? "bg-primary-500 " : "leftsidebar_link_hovered"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-up")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />

              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftBar;
