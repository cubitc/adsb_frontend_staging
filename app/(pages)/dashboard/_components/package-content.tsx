import { Badge } from "@/_frontend/components/badge";
import { Button } from "@/_frontend/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import { Coins, Package, Plus } from "lucide-react";

const PackageContent = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-crypto-blue/10 to-crypto-purple/10 border-crypto-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Packages</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all duration-200 border-2 ${
            tab === "package"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => setTab("package")}
        >
          <CardContent className="p-6 text-center">
            <Wallet className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground">View Package</h3>
            <p className="text-sm text-muted-foreground">Purchase package</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-200 border-2 ${
            tab === "pin"
              ? "border-crypto-gold bg-crypto-gold/5"
              : "border-border hover:border-crypto-gold/50"
          }`}
          onClick={() => setTab("pin")}
        >
          <CardContent className="p-6 text-center">
            <Key className="w-8 h-8 text-crypto-gold mx-auto mb-2" />
            <h3 className="font-semibold text-foreground">PIN Activation</h3>
            <p className="text-sm text-muted-foreground">Use activation code</p>
          </CardContent>
        </Card>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Packages */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-primary" />
              <span>Active Packages</span>
            </CardTitle>
            <CardDescription>
              Your current mining packages and token balance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <div className="font-medium text-foreground">
                  Standard Mining Package
                </div>
                <div className="text-sm text-muted-foreground">
                  $10 per package
                </div>
              </div>
              <Badge className="bg-success/20 text-success">4 Active</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border ">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-crypto-gold" />
                <div>
                  <p className="font-medium text-foreground">ADSB Balance</p>
                  <p className="text-sm text-muted-foreground">
                    Available tokens
                  </p>
                </div>
              </div>
              <span className="text-xl font-bold text-crypto-gold">400</span>
            </div>

            <div className="pt-4">
              <Button className="bg-gradient-to-r from-primary to-crypto-blue hover:shadow-[var(--shadow-glow)] transition-all duration-300 w-full ">
                <Plus className="w-4 h-4 mr-2" />
                Buy Package
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Package Statistics</CardTitle>
            <CardDescription>
              Overview of your investment and returns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Invested
                </span>
                <span className="font-medium text-foreground">$40.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  ADSB Earned
                </span>
                <span className="font-medium text-crypto-gold">400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Package Value
                </span>
                <span className="font-medium text-foreground">
                  $10 = 100 tokens
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm font-medium text-foreground">
                  Next Token Launch
                </span>
                <Badge
                  variant="secondary"
                  className="bg-warning/20 text-warning"
                >
                  Coming Soon
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card className="bg-gradient-to-br from-card to-secondary border-border">
              <CardHeader>
                <CardTitle>PIN Activation</CardTitle>
                <CardDescription>
                  Enter your activation PIN code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="pin"
                    className="text-sm font-medium text-foreground"
                  >
                    Activation PIN
                  </label>
                  <Input
                    id="pin"
                    type="text"
                    placeholder="Enter your PIN code"
                    className="bg-background border-border text-center  tracking-widest"
                    maxLength={12}
                  />
                </div>

                <div className="p-4 bg-background rounded-lg border border-border">
                  <h4 className="font-medium text-foreground mb-2">
                    How to get a PIN?
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Purchase from the Reseller section</li>
                    <li>• Contact your referrer for bulk packages</li>
                    <li>• You will receive the pin from your reseller</li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-crypto-gold to-warning hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <Key className="w-4 h-4 mr-2" />
                  Activate with PIN
                </Button>
              </CardContent>
            </Card>

             <Card className="bg-gradient-to-br from-card to-secondary border-border">
              <CardHeader>
                <CardTitle>PIN Activation Benefits</CardTitle>
                <CardDescription>
                  What you get with PIN activation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-foreground">
                      Instant activation
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-foreground">
                      100 tokens credited
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-foreground">
                      Affiliate link activated
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-foreground">
                      Mining package activated
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-crypto-gold/10 to-warning/10 rounded-lg border border-crypto-gold/20">
                  <p className="text-sm text-foreground">
                    <strong>Note:</strong> Each PIN can only be used once. Make
                    sure to enter the correct PIN code.
                  </p>
                </div>
              </CardContent>
            </Card> */}
      </div>
    </div>
  );
};
export default PackageContent;
