import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, Square } from "lucide-react";

interface BotControlProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
  canStart: boolean;
}

export default function BotControl({ isActive, onToggle, canStart }: BotControlProps) {
  return (
    <Card className={isActive ? "border-primary" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          {isActive ? (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          ) : (
            <Square className="w-4 h-4 text-muted-foreground" />
          )}
          Bot Control
        </CardTitle>
        <CardDescription className="text-xs">
          {isActive ? "Bot is actively scanning for signals" : "Bot is stopped"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="bot-toggle" className="text-sm font-medium">
            {isActive ? "Stop Bot" : "Start Bot"}
          </Label>
          <Switch
            id="bot-toggle"
            checked={isActive}
            onCheckedChange={onToggle}
            disabled={!canStart && !isActive}
            data-testid="switch-bot-control"
          />
        </div>
        {!canStart && !isActive && (
          <p className="text-xs text-destructive mt-2">
            Please configure all settings and connect SSID before starting
          </p>
        )}
      </CardContent>
    </Card>
  );
}
