import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await currentUser();
  console.log("🚀 ~ file: page.tsx:6 ~ page ~ user:", user);

  const dataFetched = await fetchUser(user.id);
  console.log("🚀 ~ file: page.tsx:12 ~ page ~ dataFetched:", dataFetched);
  if (dataFetched?.onboarded) redirect("/");

  const userInfo = {};

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName,
    bio: dataFetched?.bio || "",
    image: dataFetched?.image || user.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Threds.
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default page;
