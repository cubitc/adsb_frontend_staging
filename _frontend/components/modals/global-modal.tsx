"use client";

import { useModal } from "@/_frontend/hooks/use-modal";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Modal } from "rizzui";

const GlobalModal = () => {
  const { isOpen, view, closeModal, customSize, size } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      customSize={customSize}
      size={size}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      className="z-[9999] [&_.pointer-events-none]:overflow-visible"
    >
      {view}
    </Modal>
  );
};

export default GlobalModal;
