import { useState } from 'react';
import TradeConfiguration from '../TradeConfiguration';

export default function TradeConfigurationExample() {
  const [amount, setAmount] = useState(1);
  const [tradeTime, setTradeTime] = useState(60);
  
  return (
    <TradeConfiguration 
      amount={amount}
      tradeTime={tradeTime}
      onAmountChange={(val) => {
        setAmount(val);
        console.log('Amount changed to:', val);
      }}
      onTradeTimeChange={(val) => {
        setTradeTime(val);
        console.log('Trade time changed to:', val);
      }}
    />
  );
}
