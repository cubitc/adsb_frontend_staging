import { Badge } from "@/_frontend/components/badge";
import { Button } from "@/_frontend/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import Render from "@/_frontend/components/Render";
import useHttp from "@/_frontend/hooks/use-http";
import { useModal } from "@/_frontend/hooks/use-modal";
import PackageModel from "@/_frontend/models/package-model";
import { api } from "@/constants/api";
import { Check, Key, Package, Plus, Users, Zap } from "lucide-react";
import { FC } from "react";
import { GridLoader } from "react-spinners";
import PackageModal from "./modals/standard-package-modal";
type ResponseData = {
  data: PackageModel;
};
type Props = {
  onPurchased?: () => void;
};
const PackageContent: FC<Props> = ({ onPurchased }) => {
  const { openModal, closeModal } = useModal();
  const { get } = useHttp();

  const { isLoading, data, refetch } = get<ResponseData>(api.package.index);
  const packageInfo = data?.data;
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-crypto-blue/10 to-crypto-purple/10 border-crypto-blue/20">
        <CardHeader className="px-6 py-3">
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">Packages</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-primary" />
              <span>Purchase Packages</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Render>
              <Render.When isTrue={isLoading}>
                <div className="text-center pt-8 pb-16 justify-center">
                  <GridLoader color="#3889c2" />
                </div>
              </Render.When>
              <Render.Else>
                <Card className="bg-gradient-card border-crypto-gold/30">
                  <CardHeader className="px-6  ">
                    <CardTitle className="flex items-center gap-x-2">
                      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                        <div className="flex flex-row items-center gap-2">
                          <Zap className="w-5 h-5 text-crypto-gold" />

                          <div className="text-lg">
                            Standard Package - $
                            {String(packageInfo?.package_infos?.package_price)}
                          </div>
                        </div>
                        <div>
                          <Button
                            onClick={() =>
                              openModal({
                                view: (
                                  <PackageModal
                                    onClose={closeModal}
                                    pkg={packageInfo}
                                    onPurchased={() => {
                                      refetch();
                                      onPurchased?.();
                                    }}
                                  />
                                ),
                              })
                            }
                            className="bg-gradient-to-r from-primary to-crypto-blue hover:shadow-[var(--shadow-glow)] transition-all duration-300 w-full "
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Buy Package
                          </Button>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-sm">
                            Receive{" "}
                            {String(
                              packageInfo?.package_infos?.adsb_per_package
                            )}{" "}
                            ADSB Coin per package
                          </span>
                        </div>
                        {!packageInfo?.has_active_package && (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-success" />
                            <span className="text-sm">Account activation</span>
                          </div>
                        )}
                        {!packageInfo?.has_active_package && (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-success" />
                            <span className="text-sm">
                              Affiliate link activation
                            </span>
                          </div>
                        )}
                        {!packageInfo?.has_active_package && (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-success" />
                            <span className="text-sm">Mining eligibility</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-crypto-gold/30">
                  <CardHeader className="px-6  ">
                    <CardTitle className="flex items-center gap-x-2">
                      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                        <div className="flex flex-row items-center gap-2">
                          <Users className="w-5 h-5 text-crypto-blue" />

                          <div className="text-lg">Reseller Packages</div>
                        </div>
                        <div>
                          <Button className="bg-gradient-to-r from-primary to-crypto-blue hover:shadow-[var(--shadow-glow)] transition-all duration-300 w-full ">
                            <Plus className="w-4 h-4 mr-2" />
                            Buy Pins
                          </Button>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="px-4 py-2 bg-background rounded border border-border/50 col-span-2">
                        <h4 className="font-semibold mb-2">Pricing Tiers</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>10-20 pin:</span>
                            <Badge
                              variant="secondary"
                              className="bg-success/20  text-success"
                            >
                              ${" "}
                              {String(
                                packageInfo?.package_infos
                                  ?.bulk_purchase_tier_1_price
                              )}
                              /package
                            </Badge>{" "}
                          </div>
                          <div className="flex justify-between">
                            <span>21+ pin:</span>
                            <Badge
                              variant="secondary"
                              className="bg-warning/20 text-warning"
                            >
                              ${" "}
                              {String(
                                packageInfo?.package_infos
                                  ?.bulk_purchase_tier_2_price
                              )}
                              /package
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-sm">
                            Activation PINs via email
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-sm">
                            Use for self or downlines
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-sm">
                            Bulk pricing discounts
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-crypto-gold/30">
                  <CardHeader className="px-6  ">
                    <CardTitle className="flex items-center gap-x-2">
                      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                        <div className="flex flex-row items-center gap-2">
                          <Key className="w-5 h-5 text-crypto-gold" />

                          <div className="text-lg">Pin Activation</div>
                        </div>
                        <div>
                          <Button className="w-full bg-gradient-to-r from-crypto-gold/30 to-warning hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                            <Key className="w-4 h-4 mr-2" />
                            Activate with PIN
                          </Button>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-sm">Instant activation</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-success" />
                          <span className="text-sm">
                            Receive{" "}
                            {String(
                              packageInfo?.package_infos?.adsb_per_package
                            )}{" "}
                            ADSB Coin per activation
                          </span>
                        </div>
                        {!packageInfo?.has_active_package && (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-success" />
                            <span className="text-sm">Account activation</span>
                          </div>
                        )}
                        {!packageInfo?.has_active_package && (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-success" />
                            <span className="text-sm">
                              Affiliate link activation
                            </span>
                          </div>
                        )}
                        {!packageInfo?.has_active_package && (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-success" />
                            <span className="text-sm">Mining eligibility</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Render.Else>
            </Render>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Package Management</CardTitle>
            <CardDescription>Recent package purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Render>
              <Render.When isTrue={isLoading}>
                <div className="text-center pt-8 pb-16 justify-center">
                  <GridLoader color="#3889c2" />
                </div>
              </Render.When>
              <Render.Else>
                <div className="space-y-3">
                  <p className="text-muted-foreground mb-4 text-center mt-24">
                    No recent package purchases.
                  </p>
                </div>
              </Render.Else>
            </Render>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default PackageContent;
