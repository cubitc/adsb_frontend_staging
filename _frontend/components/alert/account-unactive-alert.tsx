import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "../card";

const AccountUnactiveAlert = () => {
  return (
    <Card className="bg-gradient-to-r from-warning/10 to-destructive/10 border-red">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-28  h-28 sm:w-10 sm:h-10 text-warning mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Activate Your Account
            </h3>
            <p className="text-sm text-muted-foreground">
              Activate your account today to unlock your affiliate link, earn
              commissions, and start mining ADSB coins!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default AccountUnactiveAlert;

const AccountUnactiveAlertModal = () => {};

export { AccountUnactiveAlertModal };
