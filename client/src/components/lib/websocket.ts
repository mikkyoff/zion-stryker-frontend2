import { WS_URL } from "./config";

export interface BotConfig {
  ssid: string;
  asset: string;
  strategy: "flash" | "super";
  timeframe: "15s" | "30s" | "1m";
  amount: number;
  tradeTime: number;
}

export interface TradeSignal {
  asset: string;
  direction: "CALL" | "PUT";
  strategy: "flash" | "super";
  timeframe: string;
  timestamp: string;
  indicators: Record<string, any>;
}

export interface TradeResult {
  id: string;
  asset: string;
  strategy: "flash" | "super";
  timeframe: "15s" | "30s" | "1m";
  timestamp: string;
  result: "win" | "loss";
  amount: number;
  profit: number;
}

export interface StatusUpdate {
  nextScanIn: number;
  scanningStatus: string;
  lastPing: string;
  isConnected: boolean;
}

export type WSMessage =
  | { type: "connected" }
  | { type: "disconnected" }
  | { type: "status"; data: StatusUpdate }
  | { type: "trade_signal"; data: TradeSignal }
  | { type: "trade_result"; data: TradeResult }
  | { type: "balance_update"; balance: number }
  | { type: "error"; message: string };

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectDelay = 3000;
  private maxReconnectDelay = 30000;
  private currentDelay = this.reconnectDelay;

  constructor(
    private onMessage: (message: WSMessage) => void,
    private onConnected?: () => void,
    private onDisconnected?: () => void,
  ) {}

  connect() {
    try {
      this.ws = new WebSocket(WS_URL);

      this.ws.onopen = () => {
        console.log("WebSocket connected to backend");
        this.currentDelay = this.reconnectDelay;
        if (this.onConnected) this.onConnected();
        this.onMessage({ type: "connected" });
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as WSMessage;
          this.onMessage(message);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        if (this.onDisconnected) this.onDisconnected();
        this.onMessage({ type: "disconnected" });
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) return;

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null;
      console.log("Attempting to reconnect...");
      this.connect();
      this.currentDelay = Math.min(
        this.currentDelay * 2,
        this.maxReconnectDelay,
      );
    }, this.currentDelay);
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected, cannot send message");
    }
  }

  startBot(config: BotConfig) {
    this.send({
      type: "start_bot",
      config,
    });
  }

  stopBot() {
    this.send({
      type: "stop_bot",
    });
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
