import PackagePaymentModel from "./package-payment-model";

export default interface PackageSubscribedModel {
  id?: string | null;
  name?: string | null;
  created_at?: string | null;
  price?: string | null;
  adsb_amount?: string | null;
  payment?: PackagePaymentModel | null;
  package_type?: number | null;
}
