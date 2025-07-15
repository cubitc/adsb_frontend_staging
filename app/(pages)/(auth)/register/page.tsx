"use client";
import { Button } from "@/_frontend/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import { Input } from "@/_frontend/components/input";
import { Password } from "@/_frontend/components/password";
import { routes } from "@/constants/route";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-card to-secondary border-border shadow-[var(--shadow-card)]">
        <CardHeader className="text-center">
          {/* <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-crypto-blue rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div> */}
          <CardTitle className="text-2xl pb-2 bg-gradient-to-r from-primary to-crypto-blue bg-clip-text text-transparent">
            ADSB Coin Mining
          </CardTitle>
          <CardDescription>
            Join our mining community and start earning tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="space-y-4">
              {/* <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> */}
              <Input
                type="email"
                placeholder="Enter your email"
                label="Email Address"
                required
                prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
                value={"mytu@mailinator.com"}
                onChange={() => {}}
              />
              <Password
                placeholder="Enter your password"
                label="Password"
                required
                prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                value={"password123"}
                onChange={() => {}}
              />
              <Password
                placeholder="Enter your password confirmation"
                label="Password Confirmation"
                required
                prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                value={"password123"}
                onChange={() => {}}
              />
            </div>
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-primary to-crypto-blue hover:shadow-[var(--shadow-glow)]"
              onClick={() => router.push(routes.dashboard.index)}
            >
              {"Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
