import { Badge } from "@/_frontend/components/badge";
import { Button } from "@/_frontend/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import { AlertCircle, Copy, DollarSign, TrendingUp, Users } from "lucide-react";

export function AffiliateContent() {
  const affiliateLink = "https://example.com/ref/user123";
  const hasActivePackage = true; // This would come from user state

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <Card className="bg-gradient-to-r from-success/10 to-crypto-gold/10 border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-success" />
            <span>Affiliate & Unilevel System</span>
          </CardTitle>
          <CardDescription>
            Earn commissions from 3 levels of referrals in our unilevel
            structure
          </CardDescription>
        </CardHeader>
      </Card>

      {!hasActivePackage && (
        <Card className="bg-gradient-to-r from-warning/10 to-destructive/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Activate Your Account
                </h3>
                <p className="text-sm text-muted-foreground">
                  Users without active packages don't have affiliate links.
                  Purchase a package to start earning commissions and appear in
                  the unilevel hierarchy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Structure */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Commission Structure</CardTitle>
            <CardDescription>
              Earn from 3 levels of your referral network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {commissionData.map((level, index) => (
              <div
                key={level.level}
                className="p-4 bg-background rounded-lg border border-border"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className={`
                        ${
                          index === 0
                            ? "bg-success/20 text-success"
                            : index === 1
                            ? "bg-crypto-blue/20 text-crypto-blue"
                            : "bg-crypto-purple/20 text-crypto-purple"
                        }
                      `}
                    >
                      Level {level.level}
                    </Badge>
                    <span className="font-medium text-foreground">
                      {level.percentage}%
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {level.users} users
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    ${level.example} USDT per $10 package
                  </p>
                  <span className="font-medium text-foreground">
                    ${level.total.toFixed(2)} USDT
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
                  ${totalCommissions.toFixed(2)} USDT
                </span>
              </div>
            </div>
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
                    <p className="text-2xl font-bold text-foreground">25</p>
                    <p className="text-sm text-muted-foreground">
                      Total Referrals
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border text-center">
                    <p className="text-2xl font-bold text-success">18</p>
                    <p className="text-sm text-muted-foreground">
                      Active Users
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-success to-crypto-gold hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Full Unilevel Tree
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Purchase an active package to unlock your affiliate link
                </p>
                <Button className="bg-gradient-to-r from-primary to-crypto-blue">
                  Buy Package Now
                </Button>
              </div>
            )}

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Only active users appear in the unilevel hierarchy</p>
              <p>• Commissions are paid in USDT</p>
              <p>• Minimum withdrawal: $15 USDT</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
