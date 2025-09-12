import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import Loader from "@/_frontend/components/loaders/grid-loader";
import Render from "@/_frontend/components/Render";
import CloudMiningStatusBadge from "@/_frontend/components/statuses/cloud-mining-status-badge";
import PaymentStatusBadge from "@/_frontend/components/statuses/payment-status";
import { Tabs, TabsContent } from "@/_frontend/components/tabs";
import { CloudMiningStatusEnum } from "@/_frontend/enums/cloud-mining-status-enum";
import { PaymentStatusEnum } from "@/_frontend/enums/payment_status_enum";
import useHttp from "@/_frontend/hooks/use-http";
import CloudMiningModel from "@/_frontend/models/cloud-mining-model";
import CloudMiningPackageListModel from "@/_frontend/models/cloud-mining-package-list-model";
import CloudMiningPayoutModel from "@/_frontend/models/cloud-mining-payout-model";
import { cn } from "@/_frontend/utils/css";
import { toLocalDateTime } from "@/_frontend/utils/date";
import { api } from "@/constants/api";
import { Cloud, DollarSign, MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "rizzui/badge";
import { Button } from "rizzui/button";

enum TabEnum {
  details,
  subscribes,
}
type Response = {
  data: CloudMiningPackageListModel;
};

type SubscriptionResponse = {
  data: CloudMiningModel[];
};

type PayoutResponse = {
  data: CloudMiningPayoutModel[];
};
type PurchaseResponse = {
  completed: boolean;
  redirect_url?: string;
};
const CloudMiningContent = () => {
  const [tab, setTab] = useState(String(TabEnum.details));
  const { get, post } = useHttp();
  const getPackages = get<Response>(api.mining.cloud.packages);
  const miningPkg = getPackages?.data?.data;

  const getSubscriptions = get<SubscriptionResponse>(api.mining.cloud.list);
  const subsData = getSubscriptions?.data?.data ?? [];

  const getPayouts = get<PayoutResponse>(api.mining.cloud.payouts);
  const payoutData = getPayouts?.data?.data ?? [];

  const onSuccess = (data: { data: PurchaseResponse }) => {
    if (data.data.completed) {
      toast.success("Mining package purchased successfully");
      setTab(String(TabEnum.details));
      getSubscriptions.refetch();
    } else {
      window.location.href = data.data.redirect_url!;
    }
  };
  const purchase3M = post(api.mining.cloud.purchase3M, {
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to purchase package"
      );
    },
    onSuccess: onSuccess,
  });
  const purchase6M = post(api.mining.cloud.purchase6M, {
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to purchase package"
      );
    },
    onSuccess: onSuccess,
  });
  const purchase12M = post(api.mining.cloud.purchase12M, {
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to purchase package"
      );
    },
    onSuccess: onSuccess,
  });

  return (
    <div className="space-y-6">
      <Card className="relative flex flex-col bg-gradient-to-br from-card to-secondary border-border">
        <CardHeader className="w-full ">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-crypto-gold" />
            Cloud Mining
          </CardTitle>

          <CardDescription>
            Rent powerful physical ADSB miners through our cloud platform — no
            hardware needed!
          </CardDescription>
          <div className="text-end ">
            <Button
              className="bg-crypto-gold text-primary-foreground hover:bg-crypto-gold/90 my-2 lg:my-0"
              onClick={() => {
                const newTab =
                  tab === String(TabEnum.details)
                    ? String(TabEnum.subscribes)
                    : String(TabEnum.details);
                setTab(newTab);
              }}
            >
              <Render>
                <Render.When isTrue={tab === String(TabEnum.details)}>
                  Subscribe cloud miners
                  <MoveRight className="w-5 h-5 text-black ml-2 " />
                </Render.When>
                <Render.When isTrue={tab === String(TabEnum.subscribes)}>
                  <MoveLeft className="w-5 h-5 text-black mr-2 " />
                  Back to mining details
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
                    <span>Your subscriptions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Render>
                    <Render.When isTrue={getSubscriptions.isLoading}>
                      <div className="text-center pt-16 pb-16 justify-center">
                        <Loader />
                      </div>
                    </Render.When>
                    <Render.Else>
                      <div className="space-y-3">
                        {subsData?.length > 0 ? (
                          subsData?.map((pkg, i) => (
                            <Card
                              key={pkg.id}
                              className={cn(
                                "bg-gradient-to-br from-card to-secondary shadow-card  border border-gray-700/90 ",
                                pkg.payment?.status !==
                                  PaymentStatusEnum.Completed &&
                                  pkg.payment?.status !==
                                    PaymentStatusEnum.Cancelled &&
                                  "cursor-pointer"
                              )}
                              onClick={() => {
                                if (pkg.payment?.status_url) {
                                  window.open(pkg.payment.status_url, "_blank");
                                }
                              }}
                            >
                              <CardContent className="py-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h3 className="font-semibold capitalize">
                                      {pkg.miner_name}{" "}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {pkg.plan_name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {toLocalDateTime(pkg.created_at!)}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <Render>
                                      <Render.When
                                        isTrue={
                                          pkg.payment?.status ===
                                          PaymentStatusEnum.Completed
                                        }
                                      >
                                        <div className="flex flex-col items-end">
                                          {pkg.status ===
                                            CloudMiningStatusEnum.Mining && (
                                            <span>
                                              <span className="text-success font-bold text-md">
                                                ~ {pkg.day_left}
                                              </span>{" "}
                                              <span className="text-xs">
                                                days
                                              </span>
                                            </span>
                                          )}
                                          <CloudMiningStatusBadge
                                            status={pkg.status}
                                            statusHumanized={
                                              pkg.status_humanized
                                            }
                                          />
                                        </div>
                                      </Render.When>
                                      <Render.Else>
                                        <PaymentStatusBadge
                                          status={pkg.payment?.status}
                                          statusHumanized={
                                            pkg.payment?.status_humanized
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
                              <Cloud className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                              <h3 className="text-lg font-semibold mb-2">
                                No cloud miner currently subscribed.
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                You don't have an active cloud mining
                                subscription at the moment. Subscribe now to
                                start renting powerful physical ADSB miners
                                through the cloud.
                              </p>
                            </CardContent>
                          </Card>
                        )}
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
                    <Render.When isTrue={getPayouts.isLoading}>
                      <div className="text-center pt-16 pb-16 justify-center">
                        <Loader />
                      </div>
                    </Render.When>

                    <Render.Else>
                      <div className="space-y-3">
                        {payoutData?.length > 0 ? (
                          payoutData.map((p) => (
                            <Card key={p.id}>
                              <CardContent className="px-4 py-2">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div>{p.cloud_mining?.miner_name}</div>
                                    <div className="text-xs text-gray-500">
                                      {toLocalDateTime(p.created_at)}
                                    </div>
                                  </div>
                                  <div className="text-crypto-gold">
                                    +{p.adsb_amount} ADSB
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card className="bg-gradient-card shadow-card">
                            <CardContent className="py-8 text-center">
                              <DollarSign className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                              <h3 className="text-lg font-semibold mb-2">
                                No reward history found.
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                Subscribe our cloud mining service to start
                                earning daily ADSB rewards. Your reward history
                                will be tracked and displayed here.
                              </p>
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
          <TabsContent value={String(TabEnum.subscribes)}>
            <CardContent>
              <Render>
                <Render.When isTrue={getPackages?.isLoading}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pt-16">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div className="mx-auto" key={index}>
                        <Loader />
                      </div>
                    ))}
                  </div>
                </Render.When>
                <Render.Else>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 3 Months */}
                    <div className="p-6 rounded-lg bg-gray-700/30 border border-border/50 space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">3 Months</h3>
                        <div className="text-2xl font-bold text-crypto-gold mt-2">
                          ${miningPkg?.m3_price}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="text-crypto-gold">
                            {miningPkg?.m3_duration_days} days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Daily Rewards:</span>
                          <span className="text-crypto-gold">
                            ~{miningPkg?.m3_daily_range} ADSB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Rewards:</span>
                          <span className="text-crypto-gold">
                            ~{miningPkg?.m3_total_range} ADSB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mining:</span>
                          <span className="text-red">
                            {miningPkg?.m3_overview}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-black/90 text-white hover:bg-opacity-50"
                        disabled={purchase3M.isPending}
                        isLoading={purchase3M.isPending}
                        onClick={() => purchase3M.mutate({})}
                      >
                        Start Mining
                      </Button>
                    </div>

                    {/* 6 Months */}
                    <div className="p-6 rounded-lg bg-crypto-gold/10 border border-crypto-gold/30 space-y-4 relative">
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-crypto-gold text-primary-foreground">
                        Popular
                      </Badge>

                      <div className="text-center">
                        <h3 className="text-lg font-semibold">6 Months</h3>
                        <div className="text-2xl font-bold text-crypto-gold mt-2">
                          ${miningPkg?.m6_price}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="text-crypto-gold">
                            {miningPkg?.m6_duration_days} days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Daily Rewards:</span>
                          <span className="text-crypto-gold">
                            ~{miningPkg?.m6_daily_range} ADSB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Rewards:</span>
                          <span className="text-crypto-gold">
                            ~{miningPkg?.m6_total_range} ADSB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mining:</span>
                          <span className="text-success">
                            {miningPkg?.m6_overview}
                          </span>
                        </div>
                      </div>

                      <Button
                        //   onClick={() => handlePurchase('6-Month Cloud Mining', cloudMining6Months)}
                        //   disabled={user.adsb_balance < cloudMining6Months}
                        className="w-full bg-crypto-gold hover:bg-crypto-gold/90 text-primary-foreground"
                        disabled={purchase6M.isPending}
                        isLoading={purchase6M.isPending}
                        onClick={() => purchase6M.mutate({})}
                      >
                        Start Mining
                      </Button>
                    </div>

                    {/* 12 Months */}
                    <div className="p-6 rounded-lg bg-gray-700/30 border border-border/50 space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">12 Months</h3>
                        <div className="text-2xl font-bold text-crypto-gold mt-2">
                          ${miningPkg?.m12_price}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="text-crypto-gold">
                            {miningPkg?.m12_duration_days} days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Daily Rewards:</span>
                          <span className="text-crypto-gold">
                            ~{miningPkg?.m12_daily_range} ADSB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Rewards:</span>
                          <span className="text-crypto-gold">
                            ~{miningPkg?.m12_total_range} ADSB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mining:</span>
                          <span className="text-success">
                            {miningPkg?.m12_overview}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-black/90 text-white hover:bg-opacity-50"
                        disabled={purchase12M.isPending}
                        isLoading={purchase12M.isPending}
                        onClick={() => purchase12M.mutate({})}
                      >
                        Start Mining
                      </Button>
                    </div>
                  </div>
                </Render.Else>
              </Render>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
export default CloudMiningContent;
