import TradeHistory, { TradeRecord } from '../TradeHistory';

// Mock trade data
const mockTrades: TradeRecord[] = [
  {
    id: "1",
    asset: "EURUSD_otc",
    strategy: "flash",
    timeframe: "1m",
    timestamp: "2025-10-08 14:23:15",
    result: "win",
    amount: 1.00,
    profit: 0.85
  },
  {
    id: "2",
    asset: "GBPUSD_otc",
    strategy: "super",
    timeframe: "30s",
    timestamp: "2025-10-08 14:21:45",
    result: "loss",
    amount: 2.00,
    profit: -2.00
  },
  {
    id: "3",
    asset: "AAPL_otc",
    strategy: "flash",
    timeframe: "15s",
    timestamp: "2025-10-08 14:19:30",
    result: "win",
    amount: 1.50,
    profit: 1.28
  },
  {
    id: "4",
    asset: "USDJPY_otc",
    strategy: "super",
    timeframe: "1m",
    timestamp: "2025-10-08 14:17:00",
    result: "win",
    amount: 1.00,
    profit: 0.85
  },
  {
    id: "5",
    asset: "TSLA_otc",
    strategy: "flash",
    timeframe: "30s",
    timestamp: "2025-10-08 14:15:30",
    result: "win",
    amount: 3.00,
    profit: 2.55
  }
];

export default function TradeHistoryExample() {
  return <TradeHistory trades={mockTrades} />;
}
