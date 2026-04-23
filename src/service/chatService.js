const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

let sessionId = null; // persists across calls without React state

export function resetSession() {
  sessionId = null;
}

// ── Silent wake-up ping ────────────────────────────────────────────────────
// Call this once on app mount (e.g. inside Chatbot's useEffect).
// Fires a GET /health request so Render starts spinning up the container
// while the recruiter is still reading the page — before they ever open chat.
export function pingServer() {
  fetch(`${API_URL}/health`, {
    method: 'GET',
    // No credentials / cookies needed — fire-and-forget
  }).catch(() => {
    // Intentionally swallow — we don't care if this fails.
    // Its only job is to wake the server, not return data.
  });
}

// ── Send a chat message ────────────────────────────────────────────────────
// Returns:
//   { ok: true,  reply: string }          — success
//   { ok: false, coldStart: true }        — 503: server still booting
//   { ok: false, coldStart: false, error } — any other failure
export async function sendChatMessage(message) {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  // Server is still in its 30-second cold-start window
  if (res.status === 503) {
    return { ok: false, coldStart: true };
  }

  const data = await res.json();

  if (!res.ok) {
    return { ok: false, coldStart: false, error: data.error || 'Request failed' };
  }

  sessionId = data.sessionId; // persist for next turn
  return { ok: true, reply: data.reply };
}