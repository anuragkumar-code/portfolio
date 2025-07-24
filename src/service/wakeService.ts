// src/service/wakeService.ts

export async function wakeBackend(): Promise<void> {
  try {
    await fetch(import.meta.env.VITE_API_URL_PING, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ query: null }), 
    });
  } catch (error) {
    console.warn("Backend wake-up call failed:", error);
  }
}
