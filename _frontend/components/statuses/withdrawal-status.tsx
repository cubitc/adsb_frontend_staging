import { WithdrawalStatusEnum } from "@/_frontend/enums/withdrawal-status-enum";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export const getStatusIcon = (status: WithdrawalStatusEnum) => {
  switch (status) {
    case WithdrawalStatusEnum.Completed:
      return <CheckCircle className="w-4 h-4 text-success" />;
    case WithdrawalStatusEnum.Processing:
    case WithdrawalStatusEnum.New:
      return <Clock className="w-4 h-4 text-warning" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-destructive" />;
  }
};

export const getStatusColor = (status: WithdrawalStatusEnum) => {
  switch (status) {
    case WithdrawalStatusEnum.Completed:
      return "bg-success/20 text-success";
    case WithdrawalStatusEnum.Processing:
    case WithdrawalStatusEnum.New:
      return "bg-warning/20 text-warning";
    default:
      return "bg-destructive/20 text-destructive";
  }
};
