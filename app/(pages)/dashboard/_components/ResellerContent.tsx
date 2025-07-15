import { useState } from "react";

import { Badge } from "@/_frontend/components/badge";
import { Button } from "@/_frontend/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import { Input } from "@/_frontend/components/input";
import { Mail, ShoppingCart, Users } from "lucide-react";

export function ResellerContent() {
  const [accountCount, setAccountCount] = useState(10);
  const [email, setEmail] = useState("");

  const getPricePerAccount = (count: number) => {
    if (count >= 21) return 8;
    if (count >= 10) return 9;
    return 10;
  };

  const pricePerAccount = getPricePerAccount(accountCount);
  const totalPrice = accountCount * pricePerAccount;
  const savings = accountCount * (10 - pricePerAccount);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-crypto-blue/10 to-crypto-purple/10 border-crypto-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-crypto-blue" />
            <span>Bulk Package Reseller</span>
          </CardTitle>
          <CardDescription>
            Purchase multiple packages at discounted rates and receive
            activation PINs via email
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Tiers */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Pricing Tiers</CardTitle>
            <CardDescription>
              Volume discounts for bulk purchases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">
                    10-20 Accounts
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-warning/20 text-warning"
                  >
                    $9/account
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Save $1 per account
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">
                    21+ Accounts
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-success/20 text-success"
                  >
                    $8/account
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Save $2 per account
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-primary/10 to-crypto-blue/10 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">
                    Regular Price
                  </span>
                  <Badge variant="outline" className="border-muted-foreground">
                    $10/account
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Standard individual pricing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Form */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Bulk Purchase</CardTitle>
            <CardDescription>
              Configure your bulk order and receive activation PINs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="accounts"
                className="text-sm font-medium text-foreground"
              >
                Number of Packages
              </label>
              <Input
                id="accounts"
                type="number"
                min="10"
                value={accountCount}
                onChange={(e) =>
                  setAccountCount(Math.max(10, parseInt(e.target.value) || 10))
                }
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email for PIN Delivery
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="p-4 bg-background rounded-lg border border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Package(s):</span>
                <span className="text-foreground">{accountCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Price per package:
                </span>
                <span className="text-foreground">
                  ${pricePerAccount?.toFixed(2) ?? "0.00"}
                </span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You save:</span>
                  <span className="text-success">
                    {" "}
                    ${savings?.toFixed(2) ?? "0.00"}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t border-border">
                <span className="text-foreground">Total:</span>
                <span className="text-foreground">
                  ${totalPrice?.toFixed(2) ?? "0.00"}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-crypto-blue to-crypto-purple hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              disabled={!email || accountCount < 10}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Purchase {accountCount} Accounts
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Activation PINs will be sent to your email after successful
              payment
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
