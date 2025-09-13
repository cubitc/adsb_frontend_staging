import { CloudMiningStatusEnum } from "@/_frontend/enums/cloud-mining-status-enum";
import { cn } from "@/_frontend/utils/css";
import { FC } from "react";

interface Props {
  status?: number | null;
  statusHumanized?: string | null;
}
const CloudMiningStatusBadge: FC<Props> = ({ status, statusHumanized }) => {
  return (
    <span
      className={cn(
        "my-1 rounded-3xl border-r border-muted    text-xs   py-0.5",
        status == CloudMiningStatusEnum.Completed && " text-success",
        status == CloudMiningStatusEnum.Mining && "   text-success",
        status == CloudMiningStatusEnum.Unpaid && "   text-red-dark"
      )}
    >
      <span className="flex flex-row items-center gap-x-2">
        <span>{statusHumanized}</span>
      </span>
    </span>
  );
};
export default CloudMiningStatusBadge;
