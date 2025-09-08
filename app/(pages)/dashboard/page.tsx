"use client";
import { Button } from "@/_frontend/components/button";
import { Card, CardContent } from "@/_frontend/components/card";
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
  Package,
  Shield,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

import useHttp from "@/_frontend/hooks/use-http";
import BalanceModel from "@/_frontend/models/balance-model";
import { api } from "@/constants/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { AffiliateContent } from "./_components/affiliate-content";
import { CoinForecastContent } from "./_components/CoinForecastContent";
import PackageContent from "./_components/package-content";
import { ResellerContent } from "./_components/ResellerContent";
import { WithdrawalContent } from "./_components/WithdrawalContent";

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

  const { data, refetch } = get<ResponseData>(api.user.balance);
  const balances = data?.data;
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-crypto-blue rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-crypto-blue bg-clip-text text-transparent">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-secondary border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Packages
                  </p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-card to-secondary border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ADSB Balance</p>
                  <p className="text-2xl font-bold text-foreground">
                    {balances?.available_adsb}
                  </p>
                </div>
                <Coins className="w-8 h-8 text-crypto-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-secondary border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Wallet Balance
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {balances?.available_usdt} USDT
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
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
          <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Package</span>
            </TabsTrigger>
            <TabsTrigger
              value="reseller"
              className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Reseller</span>
            </TabsTrigger>
            <TabsTrigger
              value="affiliate"
              className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Affiliate</span>
            </TabsTrigger>

            <TabsTrigger
              value="withdrawal"
              className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Withdraw</span>
            </TabsTrigger>
            <TabsTrigger
              value="forecast"
              className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Coin Forecast</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <PackageContent onPurchased={refetch} />
          </TabsContent>

          <TabsContent value="reseller">
            <ResellerContent />
          </TabsContent>

          <TabsContent value="affiliate">
            <AffiliateContent />
          </TabsContent>

          <TabsContent value="withdrawal">
            <WithdrawalContent />
          </TabsContent>

          <TabsContent value="forecast">
            <CoinForecastContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default Page;
