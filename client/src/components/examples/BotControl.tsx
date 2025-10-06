import { useState } from 'react';
import BotControl from '../BotControl';

export default function BotControlExample() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <BotControl 
      isActive={isActive}
      onToggle={(active) => {
        setIsActive(active);
        console.log('Bot toggled:', active);
      }}
      canStart={true}
    />
  );
}
