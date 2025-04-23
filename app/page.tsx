"use client";
import { useModal } from "@/_frontend/hooks/use-modal";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "rizzui";

export default function Home() {
  const { openModal } = useModal();
  const router = useRouter();

  return (
    <div className="flex gap-8 mx-auto max-w-7xl justify-center">
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Open Page With Top Loader
      </Button>

      <Button onClick={() => openModal({ view: <div>1</div> })}>
        Open Global Modal
      </Button>
    </div>
  );
}
