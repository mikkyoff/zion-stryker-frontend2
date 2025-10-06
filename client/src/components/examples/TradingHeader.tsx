import TradingHeader from '../TradingHeader';

export default function TradingHeaderExample() {
  return (
    <TradingHeader 
      balance={1247.85}
      connectionStatus="connected"
      onSettingsClick={() => console.log('Settings clicked')}
    />
  );
}
