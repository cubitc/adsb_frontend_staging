import { WithdrawalStatusEnum } from "../enums/withdrawal-status-enum";

export default interface WithdrawalTransactionModel {
  id?: string | null;
  wallet_address?: string | null;
  amount?: string | null;
  created_at?: string | null;
  wallet_type?: string | null;
  status?: WithdrawalStatusEnum | null;
  status_humanized?: string | null;
}
