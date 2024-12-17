"use client";

import ReactToast from "@/_frontend/components/ReactToast";
import useHttp from "@/_frontend/hooks/useHttp";
import { LOGIN_PATH } from "@/constants/api";
import { SIGNUP_ROUTE } from "@/constants/route";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input } from "rizzui";

type LogInInputs = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const router = useRouter();

  const { post } = useHttp();
  const { register, handleSubmit, getValues } = useForm<LogInInputs>();
  const logIn = post<LogInInputs>(LOGIN_PATH, {
    onSuccess: () => {
      router.replace("/dashboard");
    },
    onError: () => {
      toast.error("Failed to login");
    },
  });
  const submit = () => {
    const formData = getValues();
    logIn.mutate(formData);
  };
  return (
    <div className="w-full md:w-2/3 lg:w-1/2 xl:w-5/12 p-4 sm:p-12 bg-white">
      <div className=" mt-12 flex flex-col items-center ">
        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className="w-full flex-1 mt-8">
            <Input
              placeholder="Wallet Address"
              className="text-[16px]"
              error={logIn.errorMsg("email")}
              {...register("email")}
            />
            <Input
              placeholder="Wallet Address"
              className="text-[16px]"
              {...register("password")}
              error={logIn.errorMsg("password")}
            />
            <Button
              type="submit"
              variant="solid"
              className="w-full mt-4"
              isLoading={logIn.isPending}
              disabled={logIn.isPending}
            >
              <span>Next</span>
              <ArrowRightIcon strokeWidth="2" className="h-4 w-4 ml-2" />
            </Button>

            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Don&apos;t have an account yet?{" "}
                <Link href={SIGNUP_ROUTE}>
                  <span className="text-blue-500 italic cursor-pointer">
                    Register
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ReactToast />
    </div>
  );
};
export default LoginPage;
