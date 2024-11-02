import { LOGIN_ROUTE } from "@/app/constants/route";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button, Input } from "rizzui";

const SignUpPage = () => {
  return (
    <div className="w-full md:w-2/3 lg:w-1/2 xl:w-5/12 p-4 sm:p-12 bg-white">
      <div className=" mt-12 flex flex-col items-center">
        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>

        <div className="w-full flex-1 mt-8  ">
          <div className="flex flex-col gap-y-4">
            <Input placeholder="Name" className="text-[16px]" />
            <Input placeholder="Wallet Address" className="text-[16px]" />
            <Button variant="solid" className="w-full mt-4">
              <span>Next</span>
              <ArrowRightIcon strokeWidth="2" className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="my-12 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Already have an account?{" "}
              <Link href={LOGIN_ROUTE}>
                <span className="text-blue-500 italic cursor-pointer">
                  Login
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
