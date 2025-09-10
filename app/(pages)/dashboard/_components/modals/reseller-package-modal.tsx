import { Badge } from "@/_frontend/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import GoldenButton from "@/_frontend/components/golden-button";
import useHttp from "@/_frontend/hooks/use-http";
import PackageModel from "@/_frontend/models/package-model";
import { api } from "@/constants/api";
import { BaseModalProps } from "@/types/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CreditCard, Users, XIcon } from "lucide-react";
import { FC, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "rizzui/input";
import { z } from "zod";

interface Props extends BaseModalProps {
  pkg?: PackageModel;
  onPurchased?: () => void;
}
type PurchaseResponse = {
  completed: boolean;
  redirect_url?: string;
};
const minQty = 10;

const schema = z.object({
  quantity: z
    .number()
    .int("Must be a whole number")
    .min(minQty, `Minimum is ${minQty}`),
  email: z.string().min(1, "Email is required"),
});

type FormValues = z.infer<typeof schema>;

const ResellerPackageModal: FC<Props> = ({ onClose, pkg, onPurchased }) => {
  const { post, getErrorMap } = useHttp();
  const purchase = post<{ quantity: number; email: string }, PurchaseResponse>(
    api.package.purchase_reseller,
    {
      onSuccess: (data) => {
        if (data.data.completed) {
          toast.success("Pin purchased successfully");
          onPurchased?.();
          onClose();
        } else {
          window.location.href = data.data.redirect_url!;
        }
      },
    }
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: minQty, email: pkg?.email || "" },
  });

  const qty = watch("quantity") || 0;

  const unitPrice = useMemo(() => {
    const p1 = Number(pkg?.package_infos?.bulk_purchase_tier_1_price ?? 0);
    const p2 = Number(pkg?.package_infos?.bulk_purchase_tier_2_price ?? p1);
    if (qty >= 21) return p2;
    if (qty >= 10) return p1;
    return 0;
  }, [qty, pkg]);

  const total = useMemo(() => unitPrice * qty, [unitPrice, qty]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

  const isPending = purchase.isPending;

  const onSubmit = (values: FormValues) => {
    purchase.mutate({ quantity: values.quantity, email: values.email });
  };
  const errorMap = getErrorMap<FormValues>(purchase.error);
  return (
    <div className="relative w-[calc(100vw-24px)] lg:w-[500px] transform overflow-hidden rounded-lg bg-gradient-card-secondary px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
      <div className="font-semibold leading-none tracking-tight text-2xl text-crypto-gold">
        Purchase Pins
      </div>

      {!isPending && (
        <div className="absolute right-0 top-0 pr-4 pt-4 block">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md text-gray-500 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <XIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
      )}

      <Card className="bg-gradient-card-secondary border-crypto-gold/30 mt-10 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-crypto-blue" />
            <div className="text-lg">Reseller Package</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-6 pt-0 w-full">
          <div className="px-4 py-2 bg-background rounded border border-border/50 col-span-2">
            <h4 className="font-semibold mb-2">Pricing Tiers</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>10–20 pins:</span>
                <Badge
                  variant="secondary"
                  className="bg-success/20 text-success"
                >
                  {fmt(
                    Number(pkg?.package_infos?.bulk_purchase_tier_1_price ?? 0)
                  )}
                  /package
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>21+ pins:</span>
                <Badge
                  variant="secondary"
                  className="bg-warning/20 text-warning"
                >
                  {fmt(
                    Number(pkg?.package_infos?.bulk_purchase_tier_2_price ?? 0)
                  )}
                  /package
                </Badge>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 mt-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Activation PINs via email</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Use for self or downlines</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Bulk pricing discounts</span>
              </div>
            </div>

            <div className="p-3 bg-secondary/30 rounded border border-border/50">
              <Controller
                control={control}
                name="quantity"
                render={({ field }) => (
                  <Input
                    label="Number of pins"
                    inputClassName="border border-crypto-gold"
                    type="number"
                    min={minQty}
                    value={Number.isNaN(field.value) ? "" : field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={errors.quantity?.message || errorMap.quantity}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    className="mt-4"
                    label="Email address ( for PIN delivery )"
                    inputClassName="border border-crypto-gold"
                    value={field.value}
                    onChange={(e) => field.onChange(String(e.target.value))}
                    error={errors.email?.message || errorMap.email}
                  />
                )}
              />
              <div className="flex justify-between text-sm mt-4">
                <span>Pin amounts:</span>
                <span>{qty || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Price per pin:</span>
                <span>{fmt(unitPrice)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg mt-2 mb-4">
                <span>Total:</span>
                <span className="text-crypto-gold">
                  {qty < minQty ? (
                    <span className="text-sm text-red">
                      Min amount: {minQty}
                    </span>
                  ) : (
                    fmt(total || 0)
                  )}
                </span>
              </div>

              <GoldenButton
                onClick={handleSubmit(onSubmit)}
                isLoading={isPending}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Purchase {fmt(total || 0)}
              </GoldenButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResellerPackageModal;
