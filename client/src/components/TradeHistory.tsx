import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface TradeRecord {
  id: string;
  asset: string;
  strategy: "flash" | "super";
  timeframe: "15s" | "30s" | "1m";
  timestamp: string;
  result: "win" | "loss";
  amount: number;
  profit: number;
}

interface TradeHistoryProps {
  trades: TradeRecord[];
}

export default function TradeHistory({ trades }: TradeHistoryProps) {
  const wins = trades.filter(t => t.result === "win").length;
  const losses = trades.filter(t => t.result === "loss").length;
  const winRate = trades.length > 0 ? ((wins / trades.length) * 100).toFixed(1) : "0.0";
  const totalPL = trades.reduce((sum, t) => sum + t.profit, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Trade History</CardTitle>
            <CardDescription className="text-xs mt-1">
              Last {trades.length} of 200 maximum trades
            </CardDescription>
          </div>
          <div className="text-right space-y-1">
            <div className="text-xs text-muted-foreground">Win Rate</div>
            <div className="text-lg font-semibold font-mono">{winRate}%</div>
            <div className={`text-sm font-mono ${totalPL >= 0 ? 'text-primary' : 'text-destructive'}`}>
              {totalPL >= 0 ? '+' : ''}{totalPL.toFixed(2)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Timestamp</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Strategy</TableHead>
                <TableHead>Timeframe</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Result</TableHead>
                <TableHead className="text-right">P/L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No trades yet. Start the bot to begin trading.
                  </TableCell>
                </TableRow>
              ) : (
                trades.map((trade) => (
                  <TableRow 
                    key={trade.id} 
                    className={trade.result === "win" ? "bg-primary/5" : "bg-destructive/5"}
                    data-testid={`row-trade-${trade.id}`}
                  >
                    <TableCell className="font-mono text-xs">{trade.timestamp}</TableCell>
                    <TableCell className="font-mono font-semibold">{trade.asset}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {trade.strategy}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{trade.timeframe}</TableCell>
                    <TableCell className="text-right font-mono">${trade.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      {trade.result === "win" ? (
                        <Badge variant="default" className="bg-primary">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Win
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Loss
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell 
                      className={`text-right font-mono font-semibold ${
                        trade.profit >= 0 ? 'text-primary' : 'text-destructive'
                      }`}
                    >
                      {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
