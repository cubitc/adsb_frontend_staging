import { Badge } from "@/_frontend/components/badge";
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
import PaymentStatusBadge from "@/_frontend/components/statuses/payment-status";
import { PackageTypeEnum } from "@/_frontend/enums/package_type_enum";
import { PaymentStatusEnum } from "@/_frontend/enums/payment_status_enum";
import useHttp from "@/_frontend/hooks/use-http";
import { useModal } from "@/_frontend/hooks/use-modal";
import PackageModel from "@/_frontend/models/package-model";
import StandardPackageListModel from "@/_frontend/models/standard-package-list-model";
import { cn } from "@/_frontend/utils/css";
import { toLocalDateTime } from "@/_frontend/utils/date";
import { api } from "@/constants/api";
import { Check, Key, Package, Plus, Users, Zap } from "lucide-react";
import { FC } from "react";
import PinActivationModal from "./modals/pin-activation-modal";
import ResellerPackageModal from "./modals/reseller-package-modal";
import PackageModal from "./modals/standard-package-modal";
type ResponseData = {
  data: StandardPackageListModel;
};
type Props = {
  onPurchased?: () => void;
};
type PackageResponse = {
  data: PackageModel[];
};
const PackageContent: FC<Props> = ({ onPurchased }) => {
  const { openModal, closeModal } = useModal();
  const { get } = useHttp();

  const { isLoading, data, refetch } = get<ResponseData>(api.package.infos);

  const packageSub = get<PackageResponse>(api.package.index);
  const packageInfo = data?.data;
  const packageList = packageSub.data?.data || [];
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-crypto-blue/10 to-crypto-purple/10 border-crypto-blue/20">
        <CardHeader className="px-6 py-3">
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">Packages</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <Card className="flex flex-col bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle className="flex-1 flex items-center space-x-2">
              <Package className="w-5 h-5 text-primary" />
              <span>Purchase Packages</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">
            <Render>
              <Render.When isTrue={isLoading}>
                <div className="text-center pt-16 pb-16 justify-center">
                  <Loader />
                </div>
              </Render.When>
              <Render.Else>
                <Card className="bg-gradient-card border border-gray-700/90">
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
                          <GoldenButton
                            onClick={() =>
                              openModal({
                                view: (
                                  <PackageModal
                                    onClose={closeModal}
                                    pkg={packageInfo}
                                    onPurchased={() => {
                                      refetch();
                                      packageSub.refetch();
                                      onPurchased?.();
                                    }}
                                  />
                                ),
                              })
                            }
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Buy Package
                          </GoldenButton>
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
                <Card className="bg-gradient-card border border-gray-700/90">
                  <CardHeader className="px-6  ">
                    <CardTitle className="flex items-center gap-x-2">
                      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                        <div className="flex flex-row items-center gap-2">
                          <Users className="w-5 h-5 text-crypto-blue" />

                          <div className="text-lg">Reseller Packages</div>
                        </div>
                        <div>
                          <GoldenButton
                            onClick={() =>
                              openModal({
                                view: (
                                  <ResellerPackageModal
                                    onClose={closeModal}
                                    pkg={packageInfo}
                                    onPurchased={() => {
                                      refetch();
                                      packageSub.refetch();
                                      onPurchased?.();
                                    }}
                                  />
                                ),
                              })
                            }
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Buy Pins
                          </GoldenButton>
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
                            <span>10-20 pins:</span>
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
                            <span>21+ pins:</span>
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
                <Card className="bg-gradient-card border border-gray-700/90">
                  <CardHeader className="px-6  ">
                    <CardTitle className="flex items-center gap-x-2">
                      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                        <div className="flex flex-row items-center gap-2">
                          <Key className="w-5 h-5 text-crypto-gold" />

                          <div className="text-lg">Pin Activation</div>
                        </div>
                        <div>
                          <GoldenButton
                            onClick={() =>
                              openModal({
                                view: (
                                  <PinActivationModal
                                    onClose={closeModal}
                                    pkg={packageInfo}
                                    onPurchased={() => {
                                      refetch();
                                      packageSub.refetch();
                                      onPurchased?.();
                                    }}
                                  />
                                ),
                              })
                            }
                          >
                            <Key className="w-4 h-4 mr-2" />
                            Activate with PIN
                          </GoldenButton>
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

        <Card className="flex flex-col bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Package Management</CardTitle>
            <CardDescription>Recent package purchases</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-4">
            <Render>
              <Render.When isTrue={packageSub.isLoading}>
                <div className="text-center pt-16 pb-16 justify-center">
                  <Loader />
                </div>
              </Render.When>
              <Render.Else>
                <div className="space-y-3">
                  {packageList.length > 0 ? (
                    packageList.map((pkg, i) => (
                      <Card
                        key={pkg.id}
                        className={cn(
                          "bg-gradient-to-br from-card to-secondary shadow-card  border border-gray-700/90 ",
                          pkg.payment?.status !== PaymentStatusEnum.Completed &&
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
                                {pkg.name} {pkg.price && `( $${pkg.price} )`}
                              </h3>

                              <p className="text-sm text-muted-foreground">
                                {toLocalDateTime(pkg.created_at!)}
                              </p>
                            </div>
                            <div className="text-right">
                              {pkg.payment?.status ===
                                PaymentStatusEnum.Completed &&
                                pkg.package_type !=
                                  PackageTypeEnum.PinPurchase && (
                                  <div className="text-sm text-crypto-gold">
                                    +{pkg.adsb_amount} ADSB
                                  </div>
                                )}

                              <PaymentStatusBadge
                                status={pkg.payment?.status}
                                statusHumanized={pkg.payment?.status_humanized}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="bg-gradient-card shadow-card">
                      <CardContent className="py-8 text-center">
                        <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">
                          No Packages Yet
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Purchase your first package to activate your account
                          and start earning ADSB Coin!
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
    </div>
  );
};
export default PackageContent;
