"use client";
import { useModal } from "@/_frontend/hooks/use-modal";
import { useRouter } from "nextjs-toploader/app";

export default function Home() {
  const { openModal } = useModal();
  const router = useRouter();

  return <div className="flex gap-8 mx-auto max-w-4xl justify-center"></div>;
}
