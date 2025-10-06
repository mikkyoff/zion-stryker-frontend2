import { Activity, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TradingHeaderProps {
  balance: number;
  connectionStatus: "connected" | "disconnected" | "connecting";
  onSettingsClick: () => void;
}

export default function TradingHeader({ balance, connectionStatus, onSettingsClick }: TradingHeaderProps) {
  const statusColors = {
    connected: "bg-status-online",
    disconnected: "bg-status-busy",
    connecting: "bg-status-away"
  };

  const statusLabels = {
    connected: "Connected",
    disconnected: "Disconnected",
    connecting: "Connecting..."
  };

  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold tracking-tight">
              Zion <span className="text-primary">Stryker</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[connectionStatus]}`} />
            <span className="text-sm text-muted-foreground">{statusLabels[connectionStatus]}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Account Balance</div>
            <div className="text-2xl font-mono font-semibold" data-testid="text-balance">
              ${balance.toFixed(2)}
            </div>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onSettingsClick}
            data-testid="button-settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
