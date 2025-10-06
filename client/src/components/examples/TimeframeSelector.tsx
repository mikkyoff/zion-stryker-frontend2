import { useState } from 'react';
import TimeframeSelector from '../TimeframeSelector';

export default function TimeframeSelectorExample() {
  const [selected, setSelected] = useState<"15s" | "30s" | "1m">("1m");
  
  return (
    <TimeframeSelector 
      selected={selected}
      onChange={(tf) => {
        setSelected(tf);
        console.log('Timeframe changed to:', tf);
      }}
    />
  );
}
