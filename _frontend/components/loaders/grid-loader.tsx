"use client";

import dynamic from "next/dynamic";

const Loader = dynamic(
  async () => {
    const { GridLoader } = await import("react-spinners");
    return function InnerLoader() {
      return <GridLoader color="#3889c2" className="mt-16" />;
    };
  },
  { ssr: false }
);

export default Loader;
