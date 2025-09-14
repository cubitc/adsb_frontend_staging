"use client";

import { Badge } from "@/_frontend/components/badge";
import { Button } from "@/_frontend/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import Loader from "@/_frontend/components/loaders/grid-loader";
import Render from "@/_frontend/components/Render";
import {
  getStatusColor,
  getStatusIcon,
} from "@/_frontend/components/statuses/withdrawal-status";
import { WalletTypeEnum } from "@/_frontend/enums/wallet-type-enum";
import { WithdrawalStatusEnum } from "@/_frontend/enums/withdrawal-status-enum";
import useHttp from "@/_frontend/hooks/use-http";
import WithdrawalInfoModel from "@/_frontend/models/withdrawal-info-model";
import WithdrawalTransactionModel from "@/_frontend/models/withdrawal-transaction-model";
import { toLocalDateTime } from "@/_frontend/utils/date";
import { api } from "@/constants/api";
import {
  AlertTriangle,
  BanknoteArrowDown,
  CheckCircle,
  Wallet,
} from "lucide-react";
import { FC, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "rizzui/input";

type Response = {
  data: WithdrawalInfoModel;
};
type HistoryResponse = {
  data: WithdrawalTransactionModel[];
};
type WithdrawalForm = {
  wallet_type?: WalletTypeEnum;
  amount: number;
  wallet_address: string;
};
type Props = {
  onWithdrawalSuccess?: () => void;
};
const WithdrawalContent: FC<Props> = ({ onWithdrawalSuccess }) => {
  const { get, post, getErrorMap } = useHttp();
  const getInfo = get<Response>(api.mining.withdrawal.infos);
  const withdrawalInfo = getInfo.data?.data;

  const getHistory = get<HistoryResponse>(api.mining.withdrawal.list);
  const withdrawalHistories = getHistory.data?.data;

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<WithdrawalForm>({
    mode: "onChange", // ⬅️ validate immediately
    reValidateMode: "onChange",
    defaultValues: {
      wallet_type: undefined,
      amount: 0,
      wallet_address: "",
    },
  });

  const submitWithdrawal = post(api.mining.withdrawal.create, {
    onSuccess() {
      getInfo.refetch();
      getHistory.refetch();
      onWithdrawalSuccess?.();
      reset({
        wallet_type: undefined,
        amount: 0,
        wallet_address: "",
      });
      toast.success("Withdrawal request submitted successfully");
    },
  });

  const selectedWallet =
    watch("wallet_type") !== undefined ? Number(watch("wallet_type")) : null;
  const amount = watch("amount") || 0;

  const minWithdrawal =
    selectedWallet === WalletTypeEnum.ADSB
      ? withdrawalInfo?.min_adsb_withdrawal_amount ?? 0
      : selectedWallet === WalletTypeEnum.USDT
      ? withdrawalInfo?.min_usdt_withdrawal_amount ?? 0
      : 0;

  const balance =
    selectedWallet === WalletTypeEnum.ADSB
      ? parseFloat(withdrawalInfo?.adsb_balance || "0")
      : selectedWallet === WalletTypeEnum.USDT
      ? parseFloat(withdrawalInfo?.usdt_balance || "0")
      : 0;

  const feePercent =
    selectedWallet === WalletTypeEnum.ADSB
      ? withdrawalInfo?.adsb_withdrawal_fee_percent ?? 0
      : selectedWallet === WalletTypeEnum.USDT
      ? withdrawalInfo?.usdt_withdrawal_fee_percent ?? 0
      : 0;

  const { fee, finalAmount } = useMemo(() => {
    const f = (amount * feePercent) / 100;
    return {
      fee: f,
      finalAmount: amount > 0 ? amount - f : 0,
    };
  }, [amount, feePercent]);

  // reset amount if wallet changes
  useEffect(() => {
    if (selectedWallet !== null) {
      setValue("amount", 0, { shouldValidate: true });
    }
  }, [selectedWallet, setValue]);

  const onSubmit = (data: WithdrawalForm) => {
    submitWithdrawal.mutate({
      ...data,
      wallet_type: Number(data.wallet_type),
    });
  };

  const handleMaxClick = () => {
    setValue("amount", balance, { shouldValidate: true });
  };

  const errorMap = getErrorMap<WithdrawalForm>(submitWithdrawal.error);

  const isSubmitDisabled =
    selectedWallet === null || finalAmount <= 0 || submitWithdrawal.isPending;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Request Withdrawal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Render>
              <Render.When isTrue={getInfo.isLoading}>
                <div className="text-center pt-16 pb-16 justify-center">
                  <Loader />
                </div>
              </Render.When>
              <Render.Else>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Wallet Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Select Wallet
                    </label>

                    <Controller
                      control={control}
                      name="wallet_type"
                      rules={{ required: "Please select a wallet" }}
                      render={({ field }) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* ADSB Wallet */}
                          <label
                            className={`p-4 bg-background rounded-lg border flex items-center justify-between ${
                              field.value === WalletTypeEnum.ADSB
                                ? "border-success"
                                : "border-border"
                            } ${
                              !withdrawalInfo?.enable_adsb_withdrawal
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            onClick={() =>
                              withdrawalInfo?.enable_adsb_withdrawal &&
                              field.onChange(WalletTypeEnum.ADSB)
                            }
                          >
                            <input
                              type="radio"
                              value={WalletTypeEnum.ADSB}
                              checked={field.value === WalletTypeEnum.ADSB}
                              readOnly
                              className="hidden"
                            />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                ADSB Wallet
                              </p>
                              <p className="text-2xl font-bold text-success">
                                {withdrawalInfo?.adsb_balance || 0} ADSB
                              </p>
                            </div>
                            {field.value === WalletTypeEnum.ADSB && (
                              <CheckCircle className="w-5 h-5 text-success" />
                            )}
                          </label>

                          {/* USDT Wallet */}
                          <label
                            className={`p-4 bg-background rounded-lg border flex items-center justify-between ${
                              field.value === WalletTypeEnum.USDT
                                ? "border-success"
                                : "border-border"
                            } ${
                              !withdrawalInfo?.enable_usdt_withdrawal
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            onClick={() =>
                              withdrawalInfo?.enable_usdt_withdrawal &&
                              field.onChange(WalletTypeEnum.USDT)
                            }
                          >
                            <input
                              type="radio"
                              value={WalletTypeEnum.USDT}
                              checked={field.value === WalletTypeEnum.USDT}
                              readOnly
                              className="hidden"
                            />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                USDT Wallet
                              </p>
                              <p className="text-2xl font-bold text-success">
                                {withdrawalInfo?.usdt_balance || 0} USDT
                              </p>
                            </div>
                            {field.value === WalletTypeEnum.USDT && (
                              <CheckCircle className="w-5 h-5 text-success" />
                            )}
                          </label>
                        </div>
                      )}
                    />
                    {errors.wallet_type && (
                      <p className="text-xs text-red-500">
                        {errors.wallet_type.message}
                      </p>
                    )}
                  </div>
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="amount"
                      className="text-sm font-medium text-foreground"
                    >
                      Withdrawal Amount
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      className="border-border"
                      inputClassName="bg-background"
                      step="0.01"
                      {...register("amount", {
                        required: "Amount is required",
                        min: {
                          value: minWithdrawal,
                          message: `Minimum withdrawal is ${minWithdrawal}`,
                        },
                        validate: (val) =>
                          val <= balance ||
                          `Amount cannot exceed balance of ${balance}`,
                      })}
                      error={errors.amount?.message || errorMap.amount}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Minimum: {minWithdrawal}</span>
                      <button
                        type="button"
                        onClick={handleMaxClick}
                        className="text-primary hover:underline"
                      >
                        Balance: {balance} Max
                      </button>
                    </div>

                    {amount > 0 && (
                      <div className="text-xs mt-2 space-y-1">
                        <p className="text-muted-foreground">
                          Fee ({feePercent}%):{" "}
                          <span className="font-medium text-foreground">
                            {fee.toFixed(4)}
                          </span>
                        </p>
                        <p className="text-muted-foreground">
                          Final Amount:{" "}
                          <span className="font-medium text-success">
                            {finalAmount.toFixed(4)}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Wallet Address */}
                  <div className="space-y-2">
                    <label
                      htmlFor="walletAddress"
                      className="text-sm font-medium text-foreground"
                    >
                      BEP20 Wallet Address
                    </label>
                    <Input
                      id="walletAddress"
                      type="text"
                      placeholder="0x... (BEP20 wallet address)"
                      className="border-border"
                      inputClassName="bg-background"
                      {...register("wallet_address", {
                        required: "Wallet address is required",
                      })}
                      error={
                        errors.wallet_address?.message ||
                        errorMap.wallet_address
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Make sure this is a valid BEP20 (BSC) wallet address
                    </p>
                  </div>
                  {/* Notice */}
                  <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                      <div className="text-xs text-foreground">
                        <p className="font-medium mb-1">Important Notice:</p>
                        <ul className="space-y-1">
                          <li>• Please double-check your wallet address</li>
                          <li>• Only BEP20 wallet addresses are supported</li>
                          <li>• Withdrawals are processed instantly</li>
                          <li>
                            • Incorrect addresses may lead to permanent loss of
                            funds
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitDisabled}
                    isLoading={submitWithdrawal.isPending}
                    className="w-full bg-gradient-to-r from-success to-crypto-gold hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-white"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Request Withdrawal
                  </Button>
                </form>
              </Render.Else>
            </Render>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="bg-gradient-to-br from-card to-secondary border-border">
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>
              Your recent withdrawal transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Render>
              <Render.When isTrue={getHistory.isLoading}>
                <div className="text-center pt-16 pb-16 justify-center">
                  <Loader />
                </div>
              </Render.When>
              <Render.Else>
                {withdrawalHistories && withdrawalHistories.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      {withdrawalHistories.map((withdrawal) => (
                        <div
                          key={withdrawal.id}
                          className="p-4 bg-background rounded-lg border border-border"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(
                                withdrawal.status as WithdrawalStatusEnum
                              )}
                              <span className="font-medium text-foreground">
                                {withdrawal.amount} {withdrawal.wallet_type}
                              </span>
                            </div>
                            <Badge
                              variant="secondary"
                              className={getStatusColor(
                                withdrawal.status as WithdrawalStatusEnum
                              )}
                            >
                              {withdrawal.status_humanized}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                              To: {withdrawal.wallet_address}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Date: {toLocalDateTime(withdrawal.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="py-8 text-center">
                      <BanknoteArrowDown className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">
                        No withdrawal history found.
                      </h3>
                    </CardContent>
                  </Card>
                )}
              </Render.Else>
            </Render>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WithdrawalContent;
