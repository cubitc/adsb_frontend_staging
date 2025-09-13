import PaymentModel from "./payment-model";

export default interface PackageModel {
  id?: string | null;
  name?: string | null;
  created_at?: string | null;
  price?: string | null;
  adsb_amount?: string | null;
  payment?: PaymentModel | null;
  package_type?: number | null;
}
