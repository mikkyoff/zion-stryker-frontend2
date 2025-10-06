import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AssetSelectorProps {
  selected: string;
  onChange: (asset: string) => void;
}

// Hardcoded OTC assets from Pocket Option API
const FOREX_OTC = [
  "EURUSD_otc", "GBPUSD_otc", "USDJPY_otc", "AUDUSD_otc", "USDCAD_otc",
  "NZDUSD_otc", "EURGBP_otc", "EURJPY_otc", "GBPJPY_otc", "USDCHF_otc",
  "AUDCAD_otc", "AUDCHF_otc", "AUDJPY_otc", "AUDNZD_otc", "CADCHF_otc",
  "CADJPY_otc", "CHFJPY_otc", "EURAUD_otc", "EURCAD_otc", "EURCHF_otc",
  "EURNZD_otc", "GBPAUD_otc", "GBPCAD_otc", "GBPCHF_otc", "GBPNZD_otc",
  "NZDCAD_otc", "NZDCHF_otc", "NZDJPY_otc"
];

const STOCK_OTC = [
  "AAPL_otc", "GOOGL_otc", "MSFT_otc", "AMZN_otc", "TSLA_otc",
  "META_otc", "NVDA_otc", "NFLX_otc", "AMD_otc", "INTC_otc",
  "BABA_otc", "BAC_otc", "DIS_otc", "IBM_otc", "JPM_otc",
  "KO_otc", "MA_otc", "MCD_otc", "NKE_otc", "PFE_otc",
  "T_otc", "V_otc", "WMT_otc", "XOM_otc"
];

export default function AssetSelector({ selected, onChange }: AssetSelectorProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Asset</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selected} onValueChange={onChange}>
          <SelectTrigger data-testid="select-asset">
            <SelectValue placeholder="Select an asset" />
          </SelectTrigger>
          <SelectContent>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Forex OTC</div>
            {FOREX_OTC.map((pair) => (
              <SelectItem key={pair} value={pair} className="font-mono">
                {pair}
              </SelectItem>
            ))}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">Stocks OTC</div>
            {STOCK_OTC.map((stock) => (
              <SelectItem key={stock} value={stock} className="font-mono">
                {stock}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
