"use client";
import { Oval } from "react-loader-spinner";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  console.log(
    "🚀 ~ file: DeleteThread.tsx:26 ~ pathname:",
    pathname === "/",
    pathname
  );
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <div>
      {isDeleting ? (
        <Oval
          ariaLabel="loading-indicator"
          height={18}
          width={18}
          strokeWidth={5}
          strokeWidthSecondary={1}
          color="#877eff"
          secondaryColor="white"
        />
      ) : (
        <Image
          src="/assets/delete.svg"
          alt="delte"
          width={18}
          height={18}
          className="cursor-pointer object-contain"
          onClick={async () => {
            setIsDeleting(true);
            await deleteThread(JSON.parse(threadId), pathname);
            // if (!parentId || !isComment) {
            //   router.push("/");
            // }
            setIsDeleting(false);
          }}
        />
      )}
    </div>
  );
}

export default DeleteThread;
