import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useFirstSegment(): string | null {
  const pathname = usePathname();
  const [firstSegment, setFirstSegment] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split("/").filter(Boolean);
      setFirstSegment(pathSegments[0] || null);
    }
  }, [pathname]);

  return firstSegment;
}
