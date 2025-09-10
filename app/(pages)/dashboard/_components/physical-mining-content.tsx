"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import GoldenButton from "@/_frontend/components/golden-button";
import {
  AlertCircle,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Globe,
  HardDrive,
  ShoppingBag,
  Wallet,
  Zap,
} from "lucide-react";
import Image from "next/image";

export function PhysicalMiningContent() {
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
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <h4 className="font-semibold mb-3">Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-success" />
                    Software download included
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
                    Estimated rewards: ~5-15 ADSB daily
                  </li>
                  <li className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-success" />
                    Rewards paid straight to your chosen ADSB wallet.
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 h-fit">
              <h4 className="font-semibold mb-3">Requirements</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Must own compatible ADS-B hardware</li>
                <li>• Stable internet connection required</li>
                <li>• 24/7 operation recommended</li>
                <li>
                  • For more info, please click{" "}
                  <a
                    href="https://adsbminer.com/"
                    target="_blank"
                    className="italic cursor-pointer text-blue-500"
                  >
                    this link
                  </a>
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-crypto-blue/10 border border-crypto-blue/30 w-full flex flex-col justify-center h-full">
              <h4 className="font-semibold mb-3">
                Download ADSB mining software
              </h4>

              {/* <Button
                className="bg-crypto-blue hover:bg-crypto-blue/90 w-full text-white mx-auto text-center justify-center flex"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download ADSB mining software
              </Button> */}
              <Card className="bg-gradient-to-r from-warning/10 to-destructive/10 border-warning/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-28  h-28 sm:w-10 sm:h-10 text-warning mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Activate Your Account
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Only active package holders are eligible to mine ADSB
                        coins. Activate your account today by purchasing a
                        package to unlock access to the ADSB mining software and
                        start mining instantly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="p-4 rounded-lg bg-crypto-blue/10 border border-crypto-blue/30 w-full">
              <h4 className="font-semibold mb-3">
                No mining machine yet? Pre-order now .
              </h4>
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
                    Estimated rewards: ~5-15 ADSB daily
                  </li>
                  <div className="mt-4 text-center">
                    <span className="text-gray-500 line-through text-lg mr-2">
                      $150.00
                    </span>
                    <span className="text-2xl font-bold text-success">
                      $75.00
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Limited-time discounted price
                    </div>
                  </div>
                </ul>
              </div>
              <GoldenButton>
                <CreditCard className="w-4 h-4 mr-2" />
                Pre-order now
              </GoldenButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
