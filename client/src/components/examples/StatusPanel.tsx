import StatusPanel from '../StatusPanel';

export default function StatusPanelExample() {
  return (
    <StatusPanel 
      nextScanIn={8}
      scanningStatus="scanning"
      lastPing="2 minutes ago"
    />
  );
}
