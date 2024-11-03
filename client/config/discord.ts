// src/config/discord.ts
export const DISCORD_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
  CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
  REDIRECT_URI: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/discord/callback`,
  SCOPES: ["identify", "guilds", "guilds.members.read"],
  AUTH_URL: function () {
    return `https://discord.com/oauth2/authorize?client_id=${
      this.CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      this.REDIRECT_URI
    )}&scope=identify+email+guilds+guilds.members.read`;

    },
};

