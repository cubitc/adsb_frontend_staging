export default interface BalanceModel {
  available_adsb?: string | null;
  available_usdt?: string | null;
  last_updated_at?: string | null;
  launch_date?: string | null;
  conservative_est?: number | null;
  adsb_usd_estimated?: string | null;
  expected_range?: string | null;
  all_referrals_count?: number | null;
  active_referrals_count?: number | null;
  show_price_forecast?: boolean | null;
}
