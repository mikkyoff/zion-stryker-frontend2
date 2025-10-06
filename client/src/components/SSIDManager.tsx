import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";

interface SSIDManagerProps {
  ssid: string;
  onSsidChange: (ssid: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnected: boolean;
}

export default function SSIDManager({ 
  ssid, 
  onSsidChange, 
  onConnect, 
  onDisconnect,
  isConnected 
}: SSIDManagerProps) {
  const [showSsid, setShowSsid] = useState(false);

  const maskSsid = (value: string) => {
    if (!value || value.length < 8) return value;
    return `****-****-${value.slice(-4)}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">SSID Configuration</CardTitle>
        <CardDescription className="text-xs">
          Connect to Pocket Option platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="ssid" className="text-sm">Session ID (SSID)</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="ssid"
                type={showSsid ? "text" : "password"}
                value={ssid}
                onChange={(e) => onSsidChange(e.target.value)}
                placeholder="Enter your SSID..."
                className="font-mono pr-10"
                data-testid="input-ssid"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowSsid(!showSsid)}
                data-testid="button-toggle-ssid-visibility"
              >
                {showSsid ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {ssid && (
              <Button
                size="icon"
                variant="destructive"
                onClick={() => {
                  onSsidChange("");
                  onDisconnect();
                }}
                data-testid="button-remove-ssid"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        {isConnected && ssid && (
          <div className="text-xs text-muted-foreground font-mono">
            Connected: {maskSsid(ssid)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
