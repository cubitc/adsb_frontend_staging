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
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Wallet,
} from "lucide-react";

export function WithdrawalContent() {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const availableBalance = 25.5; // This would come from user state
  const minimumWithdrawal = 15;
  const canWithdraw =
    parseFloat(amount) >= minimumWithdrawal &&
    parseFloat(amount) <= availableBalance &&
    walletAddress;

  const withdrawalHistory = [
    {
      id: 1,
      amount: 20.0,
      address: "0x1234...5678",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: 2,
      amount: 15.5,
      address: "0x9876...4321",
      status: "pending",
      date: "2024-01-14",
    },
    {
      id: 3,
      amount: 30.0,
      address: "0x5555...7777",
      status: "completed",
      date: "2024-01-10",
    },
  ];

  const handleWithdraw = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setAmount("");
    setWalletAddress("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/20 text-success";
      case "pending":
        return "bg-warning/20 text-warning";
      default:
        return "bg-destructive/20 text-destructive";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Withdrawal Form */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Request Withdrawal</CardTitle>
            <CardDescription>
              Minimum withdrawal amount: $15 USDT
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Available Balance */}
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available Balance
                  </p>
                  <p className="text-2xl font-bold text-success">
                    ${availableBalance.toFixed(2)} USDT
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
              </div>
            </div>

            {/* Withdrawal Amount */}
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-foreground"
              >
                Withdrawal Amount (USDT)
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-background border-border"
                min={minimumWithdrawal}
                max={availableBalance}
                step="0.01"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minimum: ${minimumWithdrawal}</span>
                <span>Maximum: ${availableBalance.toFixed(2)}</span>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="space-y-2">
              <label
                htmlFor="wallet"
                className="text-sm font-medium text-foreground"
              >
                BEP20 Wallet Address
              </label>
              <Input
                id="wallet"
                type="text"
                placeholder="0x... (BEP20 wallet address)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-background border-border font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Make sure this is a valid BEP20 (BSC) wallet address
              </p>
            </div>

            {/* Warning */}
            <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                <div className="text-xs text-foreground">
                  <p className="font-medium mb-1">Important Notice:</p>
                  <ul className="space-y-1">
                    <li>• Double-check your wallet address</li>
                    <li>• Only BEP20 addresses are supported</li>
                    <li>• Withdrawals are processed within 24 hours</li>
                    <li>• Incorrect addresses may result in permanent loss</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              disabled={!canWithdraw || isLoading}
              className="w-full bg-gradient-to-r from-success to-crypto-gold hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-white"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isLoading ? "Processing..." : "Request Withdrawal"}
            </Button>
          </CardContent>
        </Card>

        {/* Withdrawal History */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>
              Your recent withdrawal transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {withdrawalHistory.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="p-4 bg-background rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(withdrawal.status)}
                      <span className="font-medium text-foreground">
                        ${withdrawal.amount.toFixed(2)} USDT
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(withdrawal.status)}
                    >
                      {withdrawal.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      To: {withdrawal.address}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Date: {withdrawal.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {withdrawalHistory.length === 0 && (
              <div className="text-center py-8">
                <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No withdrawal history yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
