import { useState, useEffect, useRef } from "react";
import TradingHeader from "@/components/TradingHeader";
import TimeframeSelector from "@/components/TimeframeSelector";
import AssetSelector from "@/components/AssetSelector";
import StrategySelector from "@/components/StrategySelector";
import TradeConfiguration from "@/components/TradeConfiguration";
import SSIDManager from "@/components/SSIDManager";
import BotControl from "@/components/BotControl";
import StatusPanel from "@/components/StatusPanel";
import TradeHistory, { TradeRecord } from "@/components/TradeHistory";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WebSocketClient } from "@/lib/websocket";
import { BACKEND_URL } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const wsClient = useRef<WebSocketClient | null>(null);
  
  const [balance, setBalance] = useState(0);
  const [timeframe, setTimeframe] = useState<"15s" | "30s" | "1m">("1m");
  const [asset, setAsset] = useState("EURUSD_otc");
  const [strategy, setStrategy] = useState<"flash" | "super">("flash");
  const [amount, setAmount] = useState(1);
  const [tradeTime, setTradeTime] = useState(60);
  const [ssid, setSsid] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isBotActive, setIsBotActive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [nextScanIn, setNextScanIn] = useState(15);
  const [scanningStatus, setScanningStatus] = useState<"waiting" | "scanning" | "signal_found" | "trade_placed">("waiting");
  const [trades, setTrades] = useState<TradeRecord[]>([]);

  // WebSocket connection
  useEffect(() => {
    wsClient.current = new WebSocketClient(
      (message) => {
        switch (message.type) {
          case "connected":
            setIsConnected(true);
            toast({
              title: "Connected",
              description: "Connected to Zion Stryker backend",
            });
            break;
          
          case "disconnected":
            setIsConnected(false);
            setIsBotActive(false);
            toast({
              title: "Disconnected",
              description: "Connection to backend lost",
              variant: "destructive",
            });
            break;
          
          case "status":
            setNextScanIn(message.data.nextScanIn);
            setScanningStatus(message.data.scanningStatus as any);
            break;
          
          case "trade_result":
            setTrades((prev) => [message.data, ...prev].slice(0, 200));
            toast({
              title: message.data.result === "win" ? "Trade Won! 🎉" : "Trade Lost",
              description: `${message.data.asset} - ${message.data.result.toUpperCase()}`,
              variant: message.data.result === "win" ? "default" : "destructive",
            });
            break;
          
          case "balance_update":
            setBalance(message.balance);
            break;
          
          case "error":
            toast({
              title: "Error",
              description: message.message,
              variant: "destructive",
            });
            break;
        }
      },
      () => setIsConnected(true),
      () => {
        setIsConnected(false);
        setIsBotActive(false);
      }
    );

    wsClient.current.connect();

    return () => {
      wsClient.current?.disconnect();
    };
  }, [toast]);

  const canStartBot = Boolean(ssid.length > 0 && asset && strategy && amount > 0 && tradeTime > 0);

  const handleBotToggle = (active: boolean) => {
    if (!wsClient.current) return;

    if (active) {
      wsClient.current.startBot({
        ssid,
        asset,
        strategy,
        timeframe,
        amount,
        tradeTime,
      });
      setIsBotActive(true);
      toast({
        title: "Bot Started",
        description: `Trading ${asset} with ${strategy} mode`,
      });
    } else {
      wsClient.current.stopBot();
      setIsBotActive(false);
      setScanningStatus("waiting");
      toast({
        title: "Bot Stopped",
        description: "Trading bot has been stopped",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TradingHeader
        balance={balance}
        connectionStatus={isConnected ? "connected" : "disconnected"}
        onSettingsClick={() => setSettingsOpen(true)}
      />

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Configuration */}
          <div className="space-y-4">
            <TimeframeSelector selected={timeframe} onChange={setTimeframe} />
            <AssetSelector selected={asset} onChange={setAsset} />
            <StrategySelector selected={strategy} onChange={setStrategy} />
            <TradeConfiguration
              amount={amount}
              tradeTime={tradeTime}
              onAmountChange={setAmount}
              onTradeTimeChange={setTradeTime}
            />
          </div>

          {/* Right Column - Connection & Control */}
          <div className="space-y-4">
            <SSIDManager
              ssid={ssid}
              onSsidChange={setSsid}
              onConnect={() => {
                setIsConnected(true);
                console.log("Connected to Pocket Option");
              }}
              onDisconnect={() => {
                setIsConnected(false);
                setIsBotActive(false);
                console.log("Disconnected from Pocket Option");
              }}
              isConnected={isConnected}
            />
            <BotControl
              isActive={isBotActive}
              onToggle={handleBotToggle}
              canStart={canStartBot}
            />
            {isBotActive && (
              <StatusPanel
                nextScanIn={nextScanIn}
                scanningStatus={scanningStatus}
                lastPing="2 minutes ago"
              />
            )}
          </div>
        </div>

        {/* Trade History */}
        <TradeHistory trades={trades} />
      </main>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={(open) => setSettingsOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Configure your Zion Stryker trading bot settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Connection</h4>
              <p className="text-sm text-muted-foreground">
                Backend: {BACKEND_URL}
              </p>
              <p className="text-xs text-muted-foreground">
                SSID can be configured in the main panel or via Railway environment variables
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">About</h4>
              <p className="text-xs text-muted-foreground">
                Zion Stryker is an automated trading bot for Pocket Option with advanced technical analysis strategies.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
