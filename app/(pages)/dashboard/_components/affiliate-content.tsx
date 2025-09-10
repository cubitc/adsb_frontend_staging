import AccountUnactiveAlert from "@/_frontend/components/alert/account-unactive-alert";
import { Badge } from "@/_frontend/components/badge";
import { Button } from "@/_frontend/components/button";
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
import useHttp from "@/_frontend/hooks/use-http";
import AffiliateModel from "@/_frontend/models/affiliate-model";
import { api } from "@/constants/api";
import { routes } from "@/constants/route";
import { Copy, DollarSign } from "lucide-react";
import { FC } from "react";
import toast from "react-hot-toast";

type ResponseData = {
  data: AffiliateModel;
};
type Props = {
  onBuyPackageClick?: () => void;
};
const AffiliateContent: FC<Props> = ({ onBuyPackageClick }) => {
  const { get } = useHttp();

  const { isLoading, data } = get<ResponseData>(api.affiliate.index);

  const commissionData = [
    {
      level: 1,
      percentage: 10,
      example: 1.0,
      users: 5,
      total: 5.0,
    },
    {
      level: 2,
      percentage: 3,
      example: 0.3,
      users: 12,
      total: 3.6,
    },
    {
      level: 3,
      percentage: 2,
      example: 0.2,
      users: 8,
      total: 1.6,
    },
  ];

  const totalCommissions = commissionData.reduce(
    (sum, level) => sum + level.total,
    0
  );

  const affiliateInfo = data?.data;
  const hasActivePackage = affiliateInfo?.has_active_package;
  const affiliateLink = routes.affiliate_link(affiliateInfo?.ref_code || "");
  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast.success("Affiliate link copied to clipboard");
  };
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-crypto-blue/10 to-crypto-purple/10 border-crypto-blue/20">
        <CardHeader className="px-6 py-3">
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">Affiliates & commissions</span>
          </CardTitle>
        </CardHeader>
      </Card>
      {!isLoading && !hasActivePackage && <AccountUnactiveAlert />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Structure */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Commission Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Render>
              <Render.When isTrue={isLoading}>
                <div className="text-center pt-8 pb-16 justify-center">
                  <Loader />
                </div>
              </Render.When>
              <Render.Else>
                {affiliateInfo?.commissions?.map((comm, index) => (
                  <div
                    key={comm.level}
                    className="p-4 bg-background rounded-lg border border-border"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="secondary"
                          className={`
                                ${
                                  index === 0
                                    ? "bg-green-600 text-green-100"
                                    : index === 1
                                    ? "bg-blue-600 text-blue-100"
                                    : index === 2
                                    ? "bg-purple-600 text-purple-100"
                                    : index === 3
                                    ? "bg-red-600 text-red-100"
                                    : index === 4
                                    ? "bg-yellow-600 text-yellow-100"
                                    : index === 5
                                    ? "bg-orange-600 text-orange-100"
                                    : index === 6
                                    ? "bg-pink-600 text-pink-100"
                                    : index === 7
                                    ? "bg-indigo-600 text-indigo-100"
                                    : index === 8
                                    ? "bg-teal-600 text-teal-100"
                                    : "bg-emerald-600 text-emerald-100"
                                }
                              `}
                        >
                          Level {comm.level}
                        </Badge>
                      </div>

                      <span className="text-sm text-muted-foreground">
                        Commissions:{" "}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {comm.total_packages} packages
                      </p>
                      <span className="font-medium text-foreground">
                        ${comm.total_amount} USDT
                      </span>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-gradient-to-r from-success/10 to-crypto-gold/10 rounded-lg border border-success/20">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">
                      Total Commissions
                    </span>
                    <span className="text-xl font-bold text-success">
                      ${affiliateInfo?.total_commission} USDT
                    </span>
                  </div>
                </div>
              </Render.Else>
            </Render>
          </CardContent>
        </Card>

        {/* Affiliate Link & Stats */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Your Affiliate Link</CardTitle>
            <CardDescription>
              Share this link to earn commissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Render>
              <Render.When isTrue={isLoading}>
                <div className="text-center pt-8 pb-16 justify-center">
                  <Loader />
                </div>
              </Render.When>
              <Render.Else>
                {hasActivePackage ? (
                  <>
                    <div className="p-3 bg-background rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-mono break-all">
                          {affiliateLink}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyToClipboard}
                          className="ml-2 border-border hover:bg-muted"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-background rounded-lg border border-border text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {affiliateInfo.all_referrals_count}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Referrals
                        </p>
                      </div>
                      <div className="p-3 bg-background rounded-lg border border-border text-center">
                        <p className="text-2xl font-bold text-success">
                          {affiliateInfo.active_referrals_count}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Active Users
                        </p>
                      </div>
                    </div>

                    {/* <Button className="w-full bg-gradient-to-r from-success to-crypto-gold hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Full Unilevel Tree
                    </Button> */}
                  </>
                ) : (
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="py-8 text-center">
                      <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-muted-foreground mb-4">
                        Get started today—purchase a package to activate your
                        account, unlock your affiliate link, and start earning
                        commissions right away!
                      </h3>
                      <div className="w-fit mx-auto">
                        <GoldenButton
                          className="w-fit hover:bg-crypto-gold hover:opacity-70"
                          onClick={onBuyPackageClick}
                        >
                          Buy Package Now
                        </GoldenButton>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Only active users appear in the unilevel hierarchy</p>
                  <p>• Commissions are paid in USDT</p>
                  {affiliateInfo?.affiliate_infos?.map((info, idx) => (
                    <p key={idx}>• {info}</p>
                  )) ?? null}
                </div>
              </Render.Else>
            </Render>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default AffiliateContent;
