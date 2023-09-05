import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { formatDateString } from "@/lib/utils";

import { fetchUser, getActivity } from "@/lib/actions/user.action";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);
  console.log("🚀 ~ file: page.tsx:16 ~ Page ~ activity:", activity);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col-reverse gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card justify-between">
                  <div className="flex gap-4">
                    <Image
                      src={activity.author.image}
                      alt="user_logo"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">
                        {activity.author.name}
                      </span>{" "}
                      replied to your thread
                    </p>
                  </div>

                  <div className="text-[#bcbcbc]">
                    {" "}
                    {formatDateString(activity.createdAt)}
                  </div>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </>
  );
}

export default Page;

// "use client";
// import React from "react";

// const page = () => {
//   const textAnim = (text: String) => {
//     const textSplit = text.split("");

//     const textSpined = textSplit.map((char, index) => {
//       return (
//         <span
//           style={{ animationDelay: `${index * 10}ms` }}
//           className={`opacity-0 text-anim `}
//         >
//           {char}
//         </span>
//       );
//     });

//     console.log(
//       "🚀 ~ file: page.tsx:7 ~ textAnim ~ textSplit:",
//       textSpined.join()
//     );

//     return textSpined;
//   };

//   return (
//     <div>
//       <h2 className="text-yellow-700">
//         {textAnim(
//           "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, vel?"
//         )}
//       </h2>
//     </div>
//   );
// };

// export default page;
