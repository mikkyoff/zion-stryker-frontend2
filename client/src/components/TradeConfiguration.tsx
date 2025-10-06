import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TradeConfigurationProps {
  amount: number;
  tradeTime: number;
  onAmountChange: (amount: number) => void;
  onTradeTimeChange: (time: number) => void;
}

export default function TradeConfiguration({ 
  amount, 
  tradeTime, 
  onAmountChange, 
  onTradeTimeChange 
}: TradeConfigurationProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Trade Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="trade-amount" className="text-sm">Trade Amount ($)</Label>
          <Input
            id="trade-amount"
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => onAmountChange(parseFloat(e.target.value) || 1)}
            className="font-mono"
            data-testid="input-amount"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trade-time" className="text-sm">Trade Time (seconds)</Label>
          <Input
            id="trade-time"
            type="number"
            min="15"
            step="15"
            value={tradeTime}
            onChange={(e) => onTradeTimeChange(parseInt(e.target.value) || 60)}
            className="font-mono"
            data-testid="input-trade-time"
          />
        </div>
      </CardContent>
    </Card>
  );
}
