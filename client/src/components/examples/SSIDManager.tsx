import { useState } from 'react';
import SSIDManager from '../SSIDManager';

export default function SSIDManagerExample() {
  const [ssid, setSsid] = useState("abc123def456ghi789");
  const [isConnected, setIsConnected] = useState(true);
  
  return (
    <SSIDManager 
      ssid={ssid}
      onSsidChange={(value) => {
        setSsid(value);
        console.log('SSID changed');
      }}
      onConnect={() => {
        setIsConnected(true);
        console.log('Connect clicked');
      }}
      onDisconnect={() => {
        setIsConnected(false);
        console.log('Disconnect clicked');
      }}
      isConnected={isConnected}
    />
  );
}
