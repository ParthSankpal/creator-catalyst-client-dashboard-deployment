"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [youtubeData, setYoutubeData] = useState(null);

  useEffect(() => {
    if (session) {
      fetch("/api/youtube/channels")
        .then((res) => res.json())
        .then((data) => setYoutubeData(data))
        .catch((err) => console.error(err));
    }
  }, [session]);

  if (!session) return <p>Please log in to see your YouTube data.</p>;

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      {youtubeData ? (
        <div>
          <h2>Your YouTube Channels</h2>
          <pre>{JSON.stringify(youtubeData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading YouTube data...</p>
      )}
    </div>
  );
}
