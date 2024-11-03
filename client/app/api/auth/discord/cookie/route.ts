import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const discordToken = cookieStore.get("discord_access_token");
  console.log("Discord token API:", discordToken.value);
  const response = discordToken.value;

  return NextResponse.json({ response });
}