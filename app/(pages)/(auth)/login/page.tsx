"use client";
import Captcha from "@/_frontend/components/captcha";
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
import { cookieName } from "@/_frontend/enums/cookie";
import { useAppUser } from "@/_frontend/hooks/use-app-user";
import useHttp from "@/_frontend/hooks/use-http";
import UserModel from "@/_frontend/models/user-model";
import { api } from "@/constants/api";
import { routes } from "@/constants/route";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { LoginSchema, LoginSchemaType } from "../_components/login-schema";

type LoginResponse = {
  user?: UserModel & { access_token?: string | null };
};
const Page = () => {
  const { post, getErrorMap } = useHttp();
  const { setUser } = useAppUser();
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  const [_, setCookie] = useCookies([cookieName.x_token]);

  const loginReq = post(
    api.auth.login,
    {
      onSuccess: (response) => {
        const data = response?.data as LoginResponse;
        setUser({
          user_uid: data?.user?.user_uid || null,
          email: data?.user?.email || null,
        });
        const expires = new Date(Date.now() + 60 * 60 * 1000);

        const token = data?.user?.access_token;
        setCookie(cookieName.x_token, token, {
          path: "/",
          expires,
        });
        router.replace(routes.dashboard.index);
      },
    },
    undefined,
    { withCredentials: true }
  );

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    loginReq.mutate({ ...data, token: token });
  };
  const errorMap = getErrorMap<LoginSchemaType>(loginReq?.error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-card to-secondary border-border shadow-[var(--shadow-card)]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl pb-2 text-crypto-blue bg-clip-text  ">
            {process.env.REACT_APP_NAME}
          </CardTitle>
          <CardDescription>Login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form validationSchema={LoginSchema} onSubmit={onSubmit}>
            {({ register, formState: { errors } }) => (
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
                </div>
                <GoldenButton isLoading={loginReq.isPending} type="submit">
                  Log in
                </GoldenButton>

                <div
                  className="flex items-center justify-end gap-2 text-sm text-muted-foreground cursor-pointer"
                  onClick={() => router.push(routes.auth.register)}
                >
                  <div>Create an account</div>
                  <FaArrowRightLong />
                </div>
                <Captcha onVerify={(token) => setToken(token)} />
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
