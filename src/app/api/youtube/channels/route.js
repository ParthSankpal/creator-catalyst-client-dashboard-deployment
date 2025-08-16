// src/app/api/youtube/channels/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { google } from "googleapis";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const youtube = google.youtube({ version: "v3", auth: oauth2Client });
    const res = await youtube.channels.list({
      part: ["snippet", "statistics", "contentDetails"],
      mine: true,
    });

    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
