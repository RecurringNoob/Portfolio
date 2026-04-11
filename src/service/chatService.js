const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

let sessionId = null; // module-level — persists across calls without React state

export function resetSession() {
  sessionId = null;
}

export async function sendChatMessage(message) {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Request failed');

  sessionId = data.sessionId; // save for next turn

  return data.reply;
}