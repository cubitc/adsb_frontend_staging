"use client";

import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
  return <NextTopLoader showSpinner={false} crawlSpeed={100} speed={100} />;
};

export default TopLoader;
