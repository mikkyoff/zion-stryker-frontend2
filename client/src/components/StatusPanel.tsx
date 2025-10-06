import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Activity, TrendingUp } from "lucide-react";

interface StatusPanelProps {
  nextScanIn: number;
  scanningStatus: "waiting" | "scanning" | "signal_found" | "trade_placed";
  lastPing: string;
}

export default function StatusPanel({ nextScanIn, scanningStatus, lastPing }: StatusPanelProps) {
  const statusMessages = {
    waiting: "Waiting for next scan window...",
    scanning: "Analyzing market conditions...",
    signal_found: "Signal detected! Placing trade...",
    trade_placed: "Trade executed successfully"
  };

  const statusColors = {
    waiting: "text-muted-foreground",
    scanning: "text-chart-3",
    signal_found: "text-primary",
    trade_placed: "text-primary"
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>Next Scan</span>
            </div>
            <span className="font-mono font-semibold" data-testid="text-next-scan">
              {nextScanIn}s
            </span>
          </div>
          <Progress value={(15 - nextScanIn) / 15 * 100} className="h-1" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className={statusColors[scanningStatus]}>
              {statusMessages[scanningStatus]}
            </span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <TrendingUp className="w-3 h-3" />
          Last ping: {lastPing}
        </div>
      </CardContent>
    </Card>
  );
}
