"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import GoldenButton from "@/_frontend/components/golden-button";
import Loader from "@/_frontend/components/loaders/grid-loader";
import Render from "@/_frontend/components/Render";
import { Tabs, TabsContent } from "@/_frontend/components/tabs";
import useHttp from "@/_frontend/hooks/use-http";
import { useModal } from "@/_frontend/hooks/use-modal";
import PhysicalMiningInfoModel from "@/_frontend/models/physical-mining-info-model";
import { api } from "@/constants/api";
import {
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Globe,
  HardDrive,
  MoveLeft,
  MoveRight,
  ShoppingBag,
  Wallet,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "rizzui/button";
import PreorderModal from "./modals/preorder-modal";
enum TabEnum {
  details,
  pre_orders,
}
type Response = {
  data: PhysicalMiningInfoModel;
};

export function PhysicalMiningContent() {
  const [tab, setTab] = useState(String(TabEnum.details));
  const { openModal, closeModal } = useModal();
  const { get } = useHttp();

  const getMiningInfo = get<Response>(api.mining.physical.infos);
  const miningInfo = getMiningInfo.data?.data;

  return (
    <div className="space-y-6">
      <Card className="flex flex-col bg-gradient-to-br from-card to-secondary border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div>
              <HardDrive className="w-5 h-5 text-crypto-gold" />
              Physical Mining Machine
            </div>
          </CardTitle>
          <CardDescription>
            Use your compatible ADS-B hardware to mine and earn daily ADSB
          </CardDescription>
          <div className="text-end ">
            <Button
              className="bg-crypto-gold text-primary-foreground hover:bg-crypto-gold/90 my-2 lg:my-0"
              onClick={() => {
                const newTab =
                  tab === String(TabEnum.details)
                    ? String(TabEnum.pre_orders)
                    : String(TabEnum.details);
                setTab(newTab);
              }}
            >
              <Render>
                <Render.When isTrue={tab === String(TabEnum.details)}>
                  Pre-order ADS-B miner
                  <MoveRight className="w-5 h-5 text-black ml-2 " />
                </Render.When>
                <Render.When isTrue={tab === String(TabEnum.pre_orders)}>
                  <MoveLeft className="w-5 h-5 text-black mr-2 " />
                  Go back
                </Render.When>
              </Render>
            </Button>
          </div>
        </CardHeader>
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsContent value={String(TabEnum.details)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch ">
              <Card className="flex flex-col bg-gradient-to-br from-card to-secondary border-none  ">
                <CardHeader>
                  <CardTitle className="flex-1 flex items-center space-x-2">
                    <span>ADS-B Miner</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Render>
                    <Render.When isTrue={getMiningInfo.isLoading}>
                      <div className="text-center pt-16 pb-16 justify-center">
                        <Loader />
                      </div>
                    </Render.When>
                    <Render.Else>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                          <h4 className="font-semibold mb-3">Features</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <Download className="w-4 h-4 text-success" />
                              ADS-B miner software download included
                            </li>
                            <li className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-success" />
                              Daily ADSB Coin rewards
                            </li>
                            <li className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-success" />
                              Unlimited mining duration
                            </li>
                            <li className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-success" />
                              Estimated rewards: ~{miningInfo?.total_range} ADSB
                              daily
                            </li>
                            <li className="flex items-center gap-2">
                              <Wallet className="w-4 h-4 text-success" />
                              Rewards sent directly to your preferred ADSB
                              wallet
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="p-4 mt-4 rounded-lg bg-secondary/30 border border-border/50 h-fit">
                        <h4 className="font-semibold mb-3">Requirements</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Must own compatible ADS-B hardware</li>
                          <li>
                            • Download and install the ADS-B software on your
                            hardware
                          </li>
                          <li>• Stable internet connection required</li>
                          <li>
                            • 24/7 operation strongly recommended for rewards
                          </li>

                          <li>
                            • Regularly update software to the latest version
                          </li>
                          <Button className="bg-crypto-gold text-primary-foreground hover:bg-crypto-gold/90  ">
                            Download ADS-B miner software
                          </Button>
                        </ul>
                      </div>
                    </Render.Else>
                  </Render>
                </CardContent>
              </Card>
              <Card className="flex flex-col bg-gradient-to-br from-card to-secondary border-none">
                <CardHeader>
                  <CardTitle className="flex-1 flex items-center space-x-2">
                    <span>Mining histories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-gradient-card shadow-card"></CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value={String(TabEnum.pre_orders)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch ">
              <Card className="flex flex-col bg-gradient-to-br from-card to-secondary border-none  ">
                <CardHeader>
                  <CardTitle className="flex-1 flex items-center space-x-2">
                    <span>Pre-order ADS-B Miner</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Render>
                    <Render.When isTrue={getMiningInfo.isLoading}>
                      <div className="text-center pt-16 pb-16 justify-center">
                        <Loader />
                      </div>
                    </Render.When>
                    <Render.Else>
                      <div className="p-4 rounded-lg bg-crypto-blue/10 border border-crypto-blue/30 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Image
                            alt="ADSB Miner"
                            src={"/images/adsb-miner.jpg"}
                            height={300}
                            width={300}
                            className="rounded-lg w-full object-cover "
                          />
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-success" />
                              ADS-B compatible mining hardware
                            </li>
                            <li className="flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-success" />
                              Pre-order, limited stock available
                            </li>
                            <li className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-success" />
                              Deliver worldwide
                            </li>
                            <li className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-success" />
                              Delivery in 3 months
                            </li>
                            <li className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-success" />
                              Estimated rewards: ~{miningInfo?.total_range} ADSB
                              daily
                            </li>
                            <div className="mt-4 text-center">
                              {!!miningInfo?.discount && (
                                <span className="text-gray-500 line-through text-lg mr-2">
                                  ${miningInfo?.original_price}
                                </span>
                              )}
                              <span className="text-2xl font-bold text-success">
                                ${miningInfo?.discounted_price}
                              </span>
                              {!!miningInfo?.discount && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Limited-time discounted price
                                </div>
                              )}
                            </div>
                          </ul>
                        </div>
                        <GoldenButton
                          onClick={() =>
                            openModal({
                              view: <PreorderModal onClose={closeModal} />,
                            })
                          }
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pre-order now - {miningInfo?.stock} stocks left
                        </GoldenButton>
                      </div>
                    </Render.Else>
                  </Render>
                </CardContent>
              </Card>
              <Card className="flex flex-col bg-gradient-to-br from-card to-secondary border-none">
                <CardHeader>
                  <CardTitle className="flex-1 flex items-center space-x-2">
                    <span>Pre-order histories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-gradient-card shadow-card"></CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
