"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import { Form } from "@/_frontend/components/forms/form";
import GoldenButton from "@/_frontend/components/golden-button";
import { Input } from "@/_frontend/components/input";
import { Password } from "@/_frontend/components/password";
import useHttp from "@/_frontend/hooks/use-http";
import { api } from "@/constants/api";
import { routes } from "@/constants/route";
import { Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "../_components/register-schema";

const Page = () => {
  const searchParams = useSearchParams();
  const referrer = searchParams.get("ref");
  const { post, getErrorMap } = useHttp();

  const router = useRouter();

  const [cookies, setCookie] = useCookies(["ref"]);
  const [refValue, setRefValue] = useState<string | null>(null);

  useEffect(() => {
    if (referrer) {
      const currentDate = new Date();
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + 30);
      setCookie("ref", referrer, { expires: futureDate });
      setRefValue(referrer);
    } else if (cookies.ref) {
      setRefValue(cookies.ref);
    }
  }, [referrer, cookies, setCookie]);

  const registerReq = post(
    api.auth.register,
    {
      onSuccess: (response) => {
        router.replace(routes.auth.login);
        toast.success("Registration successful! Please log in.");
      },
    },
    undefined,
    { withCredentials: true }
  );

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    registerReq.mutate({ ...data, ref: refValue });
  };
  const errorMap = getErrorMap<RegisterSchemaType>(registerReq?.error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-card to-secondary border-border shadow-[var(--shadow-card)]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl pb-2 text-crypto-blue bg-clip-text  ">
            {process.env.REACT_APP_NAME}
          </CardTitle>
          <CardDescription>
            Join our community and start earning ADSB tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form validationSchema={RegisterSchema} onSubmit={onSubmit}>
            {({ register, control, formState: { errors } }) => (
              <div className="space-y-8">
                <div className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
                    {...register("email")}
                    error={errors.email?.message || errorMap.email}
                  />
                  <Password
                    placeholder="Enter your password"
                    label="Password"
                    {...register("password")}
                    prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                    error={errors.password?.message || errorMap.password}
                  />
                  <Password
                    placeholder="Enter your password confirmation"
                    label="Password Confirmation"
                    {...register("password_confirmation")}
                    prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                    error={
                      errors.password_confirmation?.message ||
                      errorMap.password_confirmation
                    }
                  />
                </div>

                <GoldenButton isLoading={registerReq.isPending} type="submit">
                  Create Account
                </GoldenButton>
                <div
                  className="flex items-center justify-end gap-2 text-sm text-muted-foreground cursor-pointer"
                  onClick={() => router.push(routes.auth.login)}
                >
                  <div>Login</div>
                  <FaArrowRightLong />
                </div>
              </div>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
const PageWrapper = () => (
  <Suspense fallback={<div> </div>}>
    <Page />
  </Suspense>
);
export default PageWrapper;
