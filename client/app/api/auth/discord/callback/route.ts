// src/app/api/auth/discord/callback/route.ts
import { NextResponse } from "next/server";
import { exchangeDiscordCode } from "../../../../../utils/auth";

export async function GET(request: Request) {
  console.log("Discord callback route");
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const tokens = await exchangeDiscordCode(code);

    // Set the access token in an HTTP-only cookie
    const response = NextResponse.redirect(new URL("/", request.url));

    // Set access token cookie
    response.cookies.set("discord_access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokens.expires_in,
    });

    // Optionally set refresh token cookie
    if (tokens.refresh_token) {
      response.cookies.set("discord_refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error("Discord authentication error:", error);
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
}
