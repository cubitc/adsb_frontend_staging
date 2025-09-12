import PaymentModel from "./payment-model";

export default interface CloudMiningModel {
  id?: string | null;
  miner_name?: string | null;
  plan_name?: string | null;
  created_at?: string | null;
  status?: number | null;
  status_humanized?: string | null;
  day_left?: string | null;
  payment?: PaymentModel | null;
}
