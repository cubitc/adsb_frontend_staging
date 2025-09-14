export default interface WithdrawalInfoModel {
  enable_usdt_withdrawal?: boolean | null;
  min_usdt_withdrawal_amount?: number | null;
  max_usdt_withdrawal_amount?: number | null;
  usdt_withdrawal_fee_percent?: number | null;
  enable_adsb_withdrawal?: boolean | null;
  min_adsb_withdrawal_amount?: number | null;
  max_adsb_withdrawal_amount?: number | null;
  adsb_withdrawal_fee_percent?: number | null;
  adsb_balance?: string | null;
  usdt_balance?: string | null;
}
