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
import { Check, CreditCard, XIcon, Zap } from "lucide-react";
import { FC } from "react";
import toast from "react-hot-toast";

interface Props extends BaseModalProps {
  pkg?: PackageModel;
  onPurchased?: () => void;
}
type PurchaseResponse = {
  completed: boolean;
  redirect_url?: string;
};

const PackageModal: FC<Props> = ({ onClose, pkg, onPurchased }) => {
  const { post } = useHttp();
  const purchase = post<Record<string, never>, PurchaseResponse>(
    api.package.purchase_standard,
    {
      onSuccess: (data) => {
        if (data.data.completed) {
          toast.success("Package purchased successfully");
          onPurchased?.();
          onClose();
        } else {
          window.location.href = data.data.redirect_url!;
        }
      },
    }
  );
  const isPending = purchase.isPending;
  return (
    <div className="relative w-[calc(100vw-24px)] lg:w-[500px]   transform overflow-hidden rounded-lg bg-gradient-card-secondary px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6    ">
      <div className="font-semibold leading-none tracking-tight text-2xl text-crypto-gold  ">
        Purchase Packages
      </div>
      {!isPending && (
        <div className="absolute right-0 top-0   pr-4 pt-4  block">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md   text-gray-500 hover:text-gray-500   "
          >
            <span className="sr-only">Close</span>
            <XIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
      )}

      <Card className="bg-gradient-card-secondary border-crypto-gold/30 mt-10 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-crypto-gold" />
            <div className="text-lg">
              Standard Package - ${String(pkg?.package_infos?.package_price)}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-6 pt-0 w-full">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">
                  Receive {String(pkg?.package_infos?.adsb_per_package)} ADSB
                  Coin per package
                </span>
              </div>
              {!pkg?.has_active_package && (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-sm">Account activation</span>
                </div>
              )}
              {!pkg?.has_active_package && (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-sm">Affiliate link activation</span>
                </div>
              )}
              {!pkg?.has_active_package && (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-sm">Mining eligibility</span>
                </div>
              )}
            </div>
            <div className="p-3 bg-secondary/30 rounded border border-border/50 ">
              <GoldenButton
                onClick={() => purchase.mutate({})}
                isLoading={isPending}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Purchase ${pkg?.package_infos?.package_price}
              </GoldenButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default PackageModal;
