"use client";
import AccountUnactiveAlert from "@/_frontend/components/alert/account-unactive-alert";
import { Card, CardHeader, CardTitle } from "@/_frontend/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/_frontend/components/tabs";
import useHttp from "@/_frontend/hooks/use-http";
import UserModel from "@/_frontend/models/user-model";
import { api } from "@/constants/api";
import { Cloud, HardDrive } from "lucide-react";
import { useState } from "react";
import CloudMiningContent from "./cloud-mining-content";
import { PhysicalMiningContent } from "./physical-mining-content";

export function MiningContent() {
  const [activeTab, setActiveTab] = useState("physical_mining");
  const { get } = useHttp();
  const { data } = get<UserModel>(api.user.is_active);
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-crypto-blue/10 to-crypto-purple/10 border-crypto-blue/20">
        <CardHeader className="px-6 py-3">
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">Mining & earn rewards.</span>
          </CardTitle>
        </CardHeader>
      </Card>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 bg-card border border-border">
          <TabsTrigger
            value="physical_mining"
            className="flex items-center space-x-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            <HardDrive className="w-4 h-4 hidden sm:inline" />
            <span className="text-[13px] md:text-sm">Physical Mining</span>
          </TabsTrigger>
          <TabsTrigger
            value="cloud_mining"
            className="flex items-center space-x-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            <Cloud className="w-4 h-4 hidden sm:inline" />
            <span className="text-[13px] md:text-sm">Cloud Mining</span>
          </TabsTrigger>
        </TabsList>
        {data && !data.is_active && <AccountUnactiveAlert />}

        <TabsContent value="physical_mining">
          <PhysicalMiningContent />
        </TabsContent>
        <TabsContent value="cloud_mining">
          <CloudMiningContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
