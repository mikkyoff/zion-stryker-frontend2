import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimeframeSelectorProps {
  selected: "15s" | "30s" | "1m";
  onChange: (timeframe: "15s" | "30s" | "1m") => void;
}

export default function TimeframeSelector({ selected, onChange }: TimeframeSelectorProps) {
  const timeframes: Array<{ value: "15s" | "30s" | "1m"; label: string }> = [
    { value: "15s", label: "15 Seconds" },
    { value: "30s", label: "30 Seconds" },
    { value: "1m", label: "1 Minute" }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Timeframe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={selected === tf.value ? "default" : "outline"}
              className="flex-1"
              onClick={() => onChange(tf.value)}
              data-testid={`button-timeframe-${tf.value}`}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
