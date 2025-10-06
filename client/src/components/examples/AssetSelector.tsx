import { useState } from 'react';
import AssetSelector from '../AssetSelector';

export default function AssetSelectorExample() {
  const [selected, setSelected] = useState("EURUSD_otc");
  
  return (
    <AssetSelector 
      selected={selected}
      onChange={(asset) => {
        setSelected(asset);
        console.log('Asset changed to:', asset);
      }}
    />
  );
}
