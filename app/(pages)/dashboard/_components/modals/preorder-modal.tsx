import GoldenButton from "@/_frontend/components/golden-button";
import { BaseModalProps } from "@/types/modal";
import { XIcon } from "lucide-react";
import { FC } from "react";
import { Input } from "rizzui/input";
import { Textarea } from "rizzui/textarea";

interface Props extends BaseModalProps {}
const PreorderModal: FC<Props> = ({ onClose }) => {
  return (
    <div className="relative w-[calc(100vw-24px)] lg:w-[500px] transform overflow-hidden rounded-lg bg-black/40 border-crypto-blue/20 border-2  px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
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
        />
        <Input
          label="Email address"
          placeholder="Your email address"
          inputClassName="bg-crypto-blue/10"
        />
        <Input
          label="Phone number"
          placeholder="Your phone number"
          inputClassName="bg-crypto-blue/10"
        />
        <Textarea
          label="Address"
          placeholder="Your address"
          textareaClassName="bg-crypto-blue/10"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Zip code"
            placeholder="Your zip code"
            inputClassName="bg-crypto-blue/10"
          />
          <Input
            label="City"
            placeholder="Your city"
            inputClassName="bg-crypto-blue/10"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <Input
            label="State"
            placeholder="Your state"
            inputClassName="bg-crypto-blue/10"
          />
          <Input
            label="Country"
            placeholder="Your country"
            inputClassName="bg-crypto-blue/10"
          />
        </div>
        <div className="mb-4" />
        <GoldenButton type="submit">Pay</GoldenButton>
      </div>
    </div>
  );
};
export default PreorderModal;
