// src/service/chatService.ts

export interface ChatResponse {
  answer: string;
}

export async function fetchChatAnswer(query: string): Promise<ChatResponse> {
  try {
    const response = await fetch("https://portfolio-backend-jbgb.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch chat answer");
  }
} 