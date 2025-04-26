"use client";
import { useModal } from "@/_frontend/hooks/use-modal";
import { useRouter } from "nextjs-toploader/app";
import { Input } from "rizzui";

export default function Home() {
  const { openModal } = useModal();
  const router = useRouter();

  return (
    <div className="flex gap-8 mx-auto max-w-4xl justify-center">
      <div className="w-full flex flex-col gap-4">
        <Input label="Name" />
        <Input label="IC No." />
      </div>
    </div>
  );
}
