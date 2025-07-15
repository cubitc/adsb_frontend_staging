import { useState } from "react";

import { Badge } from "@/_frontend/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import { Newspaper } from "lucide-react";

export function CoinForecastContent() {
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
            <Newspaper className="w-5 h-5 text-crypto-blue" />
            <span>Coin Forecast and News</span>
          </CardTitle>
          <CardDescription>
            Get the latest coin forecasts and news updates
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Tiers */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Coin Forecast</CardTitle>
            <CardDescription>
              Latest ADSB Coin forecasts and market analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge variant="secondary" className="bg-warning/20 text-warning">
              Comming Soon
            </Badge>
          </CardContent>
        </Card>

        {/* Purchase Form */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>News and Updates</CardTitle>
            <CardDescription>
              View the latest news and updates about ADSB Coin and the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  SPECIAL DISCOUNT FOR INITIAL LAUNCHING
                </div>
                {/* <Badge
                      variant="secondary"
                      className={getStatusColor(withdrawal.status)}
                    >
                      {withdrawal.status}
                    </Badge> */}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  We are pleased to announce a special discount package in
                  celebration of our new mining device launch
                </p>
                <div className="flex justify-between items-center align-middle text-center pt-4">
                  <div className="cursor-pointer text-blue-300 font-medium ">
                    Read More
                  </div>
                  <div className="text-xs text-gray-400">12 July, 2025</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
