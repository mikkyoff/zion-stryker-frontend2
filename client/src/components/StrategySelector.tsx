import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Target } from "lucide-react";

interface StrategySelectorProps {
  selected: "flash" | "super";
  onChange: (strategy: "flash" | "super") => void;
}

export default function StrategySelector({ selected, onChange }: StrategySelectorProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Strategy Mode</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onChange("flash")}
            className={`p-4 rounded-md border-2 transition-all text-left hover-elevate ${
              selected === "flash"
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
            data-testid="button-strategy-flash"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className={`w-5 h-5 ${selected === "flash" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="font-semibold">Flash Mode</div>
            </div>
            <div className="text-xs text-muted-foreground">
              EMA(6,18) crossover with RSI & Bollinger Bands validation
            </div>
          </button>

          <button
            onClick={() => onChange("super")}
            className={`p-4 rounded-md border-2 transition-all text-left hover-elevate ${
              selected === "super"
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
            data-testid="button-strategy-super"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className={`w-5 h-5 ${selected === "super" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="font-semibold">Super Mode</div>
            </div>
            <div className="text-xs text-muted-foreground">
              MACD crossover with SMA(7), RSI & Bollinger Bands validation
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
