import CommissionModel from "./commission-model";

export default interface AffiliateModel {
  has_active_package?: boolean | null;
  affiliate_infos?: string[] | null;
  ref_code?: string | null;
  all_referrals_count?: number | null;
  active_referrals_count?: number | null;
  commissions?: CommissionModel[] | null;
  total_commission?: string | number | null;
}
