import { useState } from 'react';
import StrategySelector from '../StrategySelector';

export default function StrategySelectorExample() {
  const [selected, setSelected] = useState<"flash" | "super">("flash");
  
  return (
    <StrategySelector 
      selected={selected}
      onChange={(strategy) => {
        setSelected(strategy);
        console.log('Strategy changed to:', strategy);
      }}
    />
  );
}
