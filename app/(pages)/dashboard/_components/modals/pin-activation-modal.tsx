import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/_frontend/components/card";
import GoldenButton from "@/_frontend/components/golden-button";
import useHttp from "@/_frontend/hooks/use-http";
import StandardPackageListModel from "@/_frontend/models/standard-package-list-model";
import { api } from "@/constants/api";
import { BaseModalProps } from "@/types/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Key, XIcon } from "lucide-react";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "rizzui/input";
import { z } from "zod";

interface Props extends BaseModalProps {
  pkg?: StandardPackageListModel;
  onPurchased?: () => void;
}
type PurchaseResponse = { completed: boolean };

const schema = z.object({
  pin_code: z.string().min(1, "Pin code is required"),
});

type FormValues = z.infer<typeof schema>;

const PinActivationModal: FC<Props> = ({ onClose, onPurchased }) => {
  const { post, getErrorMap } = useHttp();
  const purchase = post<{ pin_code: string }, PurchaseResponse>(
    api.package.activate_pin,
    {
      onSuccess: (data) => {
        if (data.data.completed) {
          toast.success("Pin activated successfully");
          onPurchased?.();
          onClose();
        }
      },
    }
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const isPending = purchase.isPending;

  const onSubmit = (values: FormValues) => {
    purchase.mutate({ pin_code: values.pin_code });
  };
  const errorMap = getErrorMap<FormValues>(purchase.error);
  return (
    <div className="relative w-[calc(100vw-24px)] lg:w-[500px] transform overflow-hidden rounded-lg bg-gradient-card-secondary px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
      <div className="font-semibold leading-none tracking-tight text-2xl text-crypto-gold">
        Pin Activation
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
            <Key className="w-5 h-5 text-crypto-gold" />
            <div className="text-lg">Pin Activation</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-6 pt-0 w-full">
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
                name="pin_code"
                render={({ field }) => (
                  <Input
                    label="Pin Code"
                    className="mb-4"
                    inputClassName="border border-crypto-gold"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={errors.pin_code?.message || errorMap.pin_code}
                  />
                )}
              />

              <GoldenButton
                onClick={handleSubmit(onSubmit)}
                isLoading={isPending}
              >
                <Key className="w-4 h-4 mr-2" />
                Activate Pin
              </GoldenButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PinActivationModal;
