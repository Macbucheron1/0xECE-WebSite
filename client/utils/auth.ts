
import { DISCORD_CONFIG } from '../config/discord'; // Adjust the import path as necessary
export async function exchangeDiscordCode(code: string) {
  const tokenParams = new URLSearchParams({
    client_id: DISCORD_CONFIG.CLIENT_ID,
    client_secret: DISCORD_CONFIG.CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: DISCORD_CONFIG.REDIRECT_URI,
  });

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: tokenParams,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to exchange code");
  }

  return response.json();
}
