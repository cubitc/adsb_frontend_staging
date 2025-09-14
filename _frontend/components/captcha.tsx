"use client";
import { FC } from "react";
import Turnstile, { useTurnstile } from "react-turnstile";

interface Props {
  onVerify: (token: string) => void;
}
const Captcha: FC<Props> = ({ onVerify }) => {
  const turnstile = useTurnstile();
  return (
    <>
      <Turnstile sitekey={process.env.TURNSTILE_SITE_KEY} onVerify={onVerify} />
    </>
  );
};
export default Captcha;
