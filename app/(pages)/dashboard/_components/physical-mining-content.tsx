"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import Loader from "@/_frontend/components/loaders/grid-loader";
import Render from "@/_frontend/components/Render";
import PaymentStatusBadge from "@/_frontend/components/statuses/payment-status";
import PreOrderStatusBadge from "@/_frontend/components/statuses/pre-order-status-badge";
import { Tabs, TabsContent } from "@/_frontend/components/tabs";
import { PaymentStatusEnum } from "@/_frontend/enums/payment_status_enum";
import useHttp from "@/_frontend/hooks/use-http";
import { useModal } from "@/_frontend/hooks/use-modal";
import PhysicalMiningInfoModel from "@/_frontend/models/physical-mining-info-model";
import PreOrderModel from "@/_frontend/models/pre-order-model";
import { cn } from "@/_frontend/utils/css";
import { toLocalDateTime } from "@/_frontend/utils/date";
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
type PreOrderResponse = {
  data: PreOrderModel[];
};
export function PhysicalMiningContent() {
  const [tab, setTab] = useState(String(TabEnum.details));
  const { openModal, closeModal } = useModal();
  const { get } = useHttp();

  const getMiningInfo = get<Response>(api.mining.physical.infos);
  const miningInfo = getMiningInfo.data?.data;

  const getPreOrders = get<PreOrderResponse>(api.mining.physical.pre_orders);
  const preOrderData = getPreOrders.data?.data ?? [];

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
                          <Button
                            className="bg-crypto-gold text-primary-foreground hover:bg-crypto-gold/90  "
                            onClick={() => alert("Functionality coming soon!")}
                          >
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
                <CardContent className="bg-gradient-card shadow-card">
                  <Render>
                    <Render.When isTrue={getMiningInfo.isLoading}>
                      <div className="text-center pt-16 pb-16 justify-center">
                        <Loader />
                      </div>
                    </Render.When>
                    <Render.Else>
                      <Card className="bg-gradient-card shadow-card">
                        <CardContent className="py-8 text-center">
                          <DollarSign className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-semibold mb-2">
                            No mining history found.
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Your connected hardware mined result will appear
                            here.
                          </p>
                        </CardContent>
                      </Card>
                    </Render.Else>
                  </Render>
                </CardContent>
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
                        <Button
                          disabled={Number(miningInfo?.stock) === 0}
                          className="w-full bg-crypto-gold text-primary-foreground hover:bg-crypto-gold/90 mt-4"
                          onClick={() =>
                            openModal({
                              view: (
                                <PreorderModal
                                  onClose={closeModal}
                                  onPurchased={() => {
                                    getMiningInfo?.refetch();
                                    getPreOrders?.refetch();
                                  }}
                                />
                              ),
                            })
                          }
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          {Number(miningInfo?.stock) === 0
                            ? "Out of stock"
                            : `Pre-order now - ${miningInfo?.stock} stocks left`}
                        </Button>
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
                <CardContent className="bg-gradient-card shadow-card">
                  <Render>
                    <Render.When isTrue={getPreOrders.isLoading}>
                      <div className="text-center pt-16 pb-16 justify-center">
                        <Loader />
                      </div>
                    </Render.When>

                    <Render.Else>
                      <div className="space-y-3">
                        {preOrderData?.length > 0 ? (
                          preOrderData.map((p) => (
                            <Card
                              key={p.id}
                              className={cn(
                                "bg-gradient-to-br from-card to-secondary shadow-card  border border-gray-700/90 ",
                                p.payment?.status !==
                                  PaymentStatusEnum.Completed &&
                                  p.payment?.status !==
                                    PaymentStatusEnum.Cancelled &&
                                  "cursor-pointer"
                              )}
                              onClick={() => {
                                if (p.payment?.status_url) {
                                  window.open(p.payment.status_url, "_blank");
                                }
                              }}
                            >
                              <CardContent className="px-4 py-2">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div>{p.full_name}</div>
                                    <div className="text-sm text-gray-400">
                                      {p.email}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      {p.phone_num}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      {p.address},
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      <div>
                                        {p.city}, {p.zip_code},
                                      </div>
                                      <div>
                                        {p.state}, {p.country}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {toLocalDateTime(p.created_at)}
                                    <Render>
                                      <Render.When
                                        isTrue={
                                          p.payment?.status ===
                                          PaymentStatusEnum.Completed
                                        }
                                      >
                                        <div className="flex flex-col items-end">
                                          <PreOrderStatusBadge
                                            status={p.status}
                                            statusHumanized={p.status_humanized}
                                          />
                                        </div>
                                      </Render.When>
                                      <Render.Else>
                                        <PaymentStatusBadge
                                          status={p.payment?.status}
                                          statusHumanized={
                                            p.payment?.status_humanized
                                          }
                                        />
                                      </Render.Else>
                                    </Render>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card className="bg-gradient-card shadow-card">
                            <CardContent className="py-8 text-center">
                              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                              <h3 className="text-lg font-semibold mb-2">
                                No pre-order history found.
                              </h3>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </Render.Else>
                  </Render>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
