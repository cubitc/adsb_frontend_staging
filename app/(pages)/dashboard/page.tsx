"use client";
import { Button } from "@/_frontend/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/_frontend/components/tabs";
import { cookieName } from "@/_frontend/enums/cookie";
import { useAppUser } from "@/_frontend/hooks/use-app-user";
import { routes } from "@/constants/route";
import {
  Coins,
  DollarSign,
  LayoutDashboard,
  Pickaxe,
  User,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import Render from "@/_frontend/components/Render";
import useHttp from "@/_frontend/hooks/use-http";
import BalanceModel from "@/_frontend/models/balance-model";
import { api } from "@/constants/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Badge } from "rizzui/badge";
import AffiliateContent from "./_components/affiliate-content";
import { MiningContent } from "./_components/mining-content";
import PackageContent from "./_components/package-content";
import { WithdrawalContent } from "./_components/withdrawal-content";

type ResponseData = {
  data: BalanceModel;
};
const Page = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAppUser();
  const router = useRouter();
  const [_, __, removeCookie] = useCookies([cookieName.x_token]);
  const { reset } = useAppUser();

  const { get } = useHttp();

  const { data, refetch, isLoading } = get<ResponseData>(api.user.balance);
  const balances = data?.data;
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-primary to-crypto-blue rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div> */}
              <h1 className="text-xl font-bold text-crypto-blue bg-clip-text  ">
                {process.env.REACT_APP_NAME}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Welcome back</p>
                <p className="font-medium text-foreground">{user.user_uid}</p>
              </div>
              <Button
                className="border-border cursor-pointer"
                color="danger"
                onClick={() => {
                  removeCookie(cookieName.x_token, { path: "/" });
                  reset();
                  router.replace(routes.auth.login);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-gradient-card shadow-card border-crypto-gold/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-crypto-gold" />
              ADSB Coin Balance
            </CardTitle>
            <CardDescription>
              Your available ADSB balance and estimated value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-crypto-gold">
                  {balances?.available_adsb || "..."} ADSB
                </div>
                <p className="text-sm text-muted-foreground">
                  Last updated:{" "}
                  {!!balances?.last_updated_at
                    ? new Date(balances?.last_updated_at!).toLocaleString()
                    : "..."}
                </p>
                <Render>
                  <Render.When isTrue={!!balances?.show_price_forecast}>
                    <div className="text-lg text-success">
                      ≈ {balances?.adsb_usd_estimated || "..."} USD
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Estimated value at {balances?.conservative_est || "..."}{" "}
                      per ADSB
                    </p>
                  </Render.When>
                </Render>
              </div>

              <div className="p-4 rounded-lg bg-black/30 border border-border/50">
                <h4 className="font-semibold mb-3">Price Forecast</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Launch Date:</span>
                    <span className="text-crypto-gold">
                      {balances?.launch_date || "..."}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Range:</span>
                    <span>
                      <Render>
                        <Render.When isTrue={isLoading}>...</Render.When>

                        <Render.Else>
                          {balances?.show_price_forecast ? (
                            `${balances?.expected_range || "-"}`
                          ) : (
                            <Badge size="sm">Comming Soon</Badge>
                          )}
                        </Render.Else>
                      </Render>
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Conservative Est:</span>
                    <span className="text-success">
                      <Render>
                        <Render.When isTrue={isLoading}>...</Render.When>

                        <Render.Else>
                          {balances?.show_price_forecast ? (
                            `$${balances?.conservative_est || "0"}`
                          ) : (
                            <Badge size="sm">Comming Soon</Badge>
                          )}
                        </Render.Else>
                      </Render>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
          <Card className="bg-gradient-to-br from-card to-secondary border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Wallet Balance
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {balances?.available_usdt || "-"} USDT
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-card to-secondary border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Referrals
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {" "}
                    {balances?.all_referrals_count || "0"}
                  </p>
                </div>
                <User className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-card to-secondary border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Referrals
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {balances?.active_referrals_count || "0"}
                  </p>
                </div>
                <Coins className="w-8 h-8 text-crypto-gold" />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Main Dashboard Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              <LayoutDashboard className="w-4 h-4 hidden sm:inline" />
              <span className="text-[13px] md:text-sm">Package</span>
            </TabsTrigger>
            <TabsTrigger
              value="mining"
              className="flex items-center space-x-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              <Pickaxe className="w-4 h-4 hidden sm:inline" />
              <span className="text-[13px] md:text-sm">Mining</span>
            </TabsTrigger>
            <TabsTrigger
              value="affiliate"
              className="flex items-center space-x-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 hidden sm:inline" />
              <span className="text-[13px] md:text-sm">Affiliate</span>
            </TabsTrigger>

            <TabsTrigger
              value="withdrawal"
              className="flex items-center space-x-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              <Wallet className="w-4 h-4 hidden sm:inline" />
              <span className="text-[13px] md:text-sm">Withdraw</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <PackageContent onPurchased={refetch} />
          </TabsContent>

          <TabsContent value="mining">
            <MiningContent />
          </TabsContent>

          <TabsContent value="affiliate">
            <AffiliateContent
              onBuyPackageClick={() => setActiveTab("overview")}
            />
          </TabsContent>

          <TabsContent value="withdrawal">
            <WithdrawalContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default Page;
