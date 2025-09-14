"use client";

import GoldenButton from "@/_frontend/components/golden-button";
import useHttp from "@/_frontend/hooks/use-http";
import { api } from "@/constants/api";
import { BaseModalProps } from "@/types/modal";
import { XIcon } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "rizzui/input";
import { Textarea } from "rizzui/textarea";

interface Props extends BaseModalProps {
  onPurchased?: () => void;
}

interface PreorderFormValues {
  full_name: string;
  email: string;
  phone_num: string;
  address: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
}
type PreOrderResponse = {
  completed: boolean;
  redirect_url?: string;
};
const PreorderModal: FC<Props> = ({ onClose, onPurchased }) => {
  const { post, getErrorMap } = useHttp();

  const preOrder = post<PreorderFormValues, PreOrderResponse>(
    api.mining.physical.pre_orders,
    {
      onSuccess: (data) => {
        if (data.data.completed) {
          toast.success("You have successfully pre-ordered the ADS-B Miner");
          onPurchased?.();
          onClose();
        } else {
          onClose();

          window.location.href = data.data.redirect_url!;
        }
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreorderFormValues>();

  const onSubmit = (data: PreorderFormValues) => {
    preOrder.mutate(data);
  };
  const errorMap = getErrorMap<PreorderFormValues>(preOrder.error);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-[calc(100vw-24px)] lg:w-[500px] transform overflow-hidden rounded-lg bg-black/40 border-crypto-blue/20 border-2  px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6"
    >
      <div className="font-semibold leading-none tracking-tight text-2xl text-crypto-gold">
        Pre-order ADS-B Miner
      </div>

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

      <div className="space-y-4 mt-6">
        <Input
          label="Full name"
          placeholder="Your full name"
          inputClassName="bg-crypto-blue/10"
          {...register("full_name", { required: "Full name is required" })}
          error={errors.full_name?.message || errorMap.full_name}
        />
        <Input
          label="Email address"
          placeholder="Your email address"
          inputClassName="bg-crypto-blue/10"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          error={errors.email?.message || errorMap.email}
        />
        <Input
          label="Phone number"
          placeholder="Your phone number"
          inputClassName="bg-crypto-blue/10"
          {...register("phone_num", { required: "Phone number is required" })}
          error={errors.phone_num?.message || errorMap.phone_num}
        />
        <Textarea
          label="Address"
          placeholder="Your address"
          textareaClassName="bg-crypto-blue/10"
          {...register("address", { required: "Address is required" })}
          error={errors.address?.message || errorMap.address}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Zip code"
            placeholder="Your zip code"
            inputClassName="bg-crypto-blue/10"
            {...register("zip_code", { required: "Zip code is required" })}
            error={errors.zip_code?.message || errorMap.zip_code}
          />
          <Input
            label="City"
            placeholder="Your city"
            inputClassName="bg-crypto-blue/10"
            {...register("city", { required: "City is required" })}
            error={errors.city?.message || errorMap.city}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="State"
            placeholder="Your state"
            inputClassName="bg-crypto-blue/10"
            {...register("state", { required: "State is required" })}
            error={errors.state?.message || errorMap.state}
          />
          <Input
            label="Country"
            placeholder="Your country"
            inputClassName="bg-crypto-blue/10"
            {...register("country", { required: "Country is required" })}
            error={errors.country?.message || errorMap.country}
          />
        </div>
        <div className="mb-4" />
        <GoldenButton type="submit" isLoading={preOrder.isPending}>
          Pay
        </GoldenButton>
      </div>
    </form>
  );
};
export default PreorderModal;
