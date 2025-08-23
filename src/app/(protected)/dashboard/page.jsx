"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [youtubeData, setYoutubeData] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("/api/youtube/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setYoutubeData(data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  if (!user) return <p>Please log in to see your YouTube data.</p>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
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
