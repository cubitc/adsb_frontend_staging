"use client";
import { useFirstSegment } from "@/app/_frontend/hooks/useFirstSegment";
import { cn } from "@/app/_frontend/utils/css";
import {
  DASHBOARD_ROUTE,
  PACKAGE_ROUTE,
  WITHDRAW_ROUTE,
} from "@/app/constants/route";
import {
  BanknotesIcon,
  BoltIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const navs = [
  {
    title: "Home",
    icon: HomeIcon,
    href: DASHBOARD_ROUTE,
  },
  {
    title: "Package",
    icon: BoltIcon,
    href: PACKAGE_ROUTE,
  },
  {
    title: "Withdraw",
    icon: BanknotesIcon,
    href: WITHDRAW_ROUTE,
  },
  {
    title: "Profile",
    icon: UserCircleIcon,
    href: WITHDRAW_ROUTE,
  },
];
export default function Layout({ children }: LayoutProps) {
  const firstSegment = useFirstSegment();
  console.log(firstSegment);

  return (
    <>
      <div className="w-fit fixed bottom-1 lg:bottom-12 mx-auto ">
        <div className="px-7 bg-dark-card shadow-lg rounded-2xl">
          <div className="flex">
            {navs.map((x) => {
              const isRoute = firstSegment === x.href.replaceAll("/", "");
              return (
                <div className="flex-1 group" key={x.title}>
                  <Link
                    href={x.href}
                    className="flex items-end justify-center text-center mx-auto px-2 lg:px-4 pt-2 w-full text-white group-hover:text-dark-orange"
                  >
                    <span className="  px-1 pt-1 pb-1 flex flex-col align-middle items-center">
                      <x.icon
                        className={cn(
                          "h-6 w-6 ",
                          isRoute && "text-dark-orange"
                        )}
                      />

                      <span
                        className={cn(
                          "block text-sm font-semibold pb-2",
                          isRoute && "text-dark-orange"
                        )}
                      >
                        {x.title}
                      </span>
                      <span
                        className={cn(
                          "block w-8 mx-auto h-1 group-hover:bg-dark-orange rounded-full",
                          isRoute && "bg-dark-orange"
                        )}
                      ></span>
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full px-2 lg:px-8 py-4 rounded-lg  bg-dark-bg">
        {children}
      </div>
    </>
  );
}
