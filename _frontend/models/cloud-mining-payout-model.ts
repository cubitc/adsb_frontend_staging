import CloudMiningModel from "./cloud-mining-model";

export default interface CloudMiningPayoutModel {
  id?: string | null;
  adsb_amount?: string | null;
  cloud_mining?: CloudMiningModel | null;
  created_at?: string | null;
}
