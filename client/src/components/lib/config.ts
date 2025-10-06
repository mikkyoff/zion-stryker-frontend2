// Backend configuration
export const BACKEND_URL = "https://zion-stryker-backend-production.up.railway.app";

// WebSocket URL (use wss:// for HTTPS)
export const WS_URL = BACKEND_URL.replace("https://", "wss://").replace("http://", "ws://");

// API endpoints
export const API_ENDPOINTS = {
  trades: `${BACKEND_URL}/api/trades`,
  status: `${BACKEND_URL}/api/status`,
  balance: `${BACKEND_URL}/api/balance`,
} as const;
