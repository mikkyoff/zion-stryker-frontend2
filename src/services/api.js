const BASE_URL = import.meta.env.VITE_API_URL || 'https://zion-stryker-backend-production.up.railway.app';

function qs(params = {}) {
  const s = new URLSearchParams(params);
  return s.toString() ? `?${s.toString()}` : '';
}

export async function fetchSignals({ timeframe = '1m', mode = 'Flash', asset = 'ALL' } = {}) {
  const url = `${BASE_URL}/api/signals${qs({ timeframe, mode, asset })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch signals');
  return res.json();
}

export async function toggleScanner(enabled = true) {
  const res = await fetch(`${BASE_URL}/api/scanner/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled })
  });
  if (!res.ok) throw new Error('Failed to toggle scanner');
  return res.json();
}

export async function getStatus() {
  const res = await fetch(`${BASE_URL}/api/status`);
  if (!res.ok) throw new Error('Failed to fetch status');
  return res.json();
}
