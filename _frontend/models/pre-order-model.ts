import PaymentModel from "./payment-model";

export default interface PreOrderModel {
  id?: string | null;
  full_name?: string | null;
  email?: string | null;
  phone_num?: string | null;
  address?: string | null;
  zip_code?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  price?: number | null;
  created_at?: string | null;
  status?: number | null;
  status_humanized?: string | null;
  payment?: PaymentModel | null;
}
