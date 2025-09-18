"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  getChallengeById,
  submitChallenge,
} from "@/src/api/challenges";
import Notification from "@/src/components/Notification/Notification";
import { ChevronLeft } from "lucide-react";
import { formatIndianDate } from "@/src/utils/validation";

// ✅ Extract YouTube Video ID
function getYouTubeId(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }
    return parsedUrl.searchParams.get("v");
  } catch {
    return null;
  }
}

// ✅ Map status to badge styles
function getStatusBadge(status) {
  switch (status) {
    case "accepted":
      return <Badge className="bg-green-500 text-white">✅ Accepted</Badge>;
    case "rejected":
      return <Badge className="bg-red-500 text-white">❌ Rejected</Badge>;
    default:
      return <Badge className="bg-gray-400 text-white">⏳ Pending</Badge>;
  }
}

export default function ChallengeDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [url, setUrl] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [city, setCity] = useState("");
  const [notification, setNotification] = useState(null);

  const fetchChallenge = async () => {
    try {
      const res = await getChallengeById(id);
      setChallenge(res.data);
      setHashtags(res.data?.hashtags || "");
    } catch (error) {
      console.error("Error fetching challenge:", error);
      setNotification({ message: "Failed to fetch challenge", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const handleSubmit = async () => {
    if (!url) {
      setNotification({ message: "Please enter a submission URL", type: "error" });
      return;
    }
    setSubmitting(true);
    try {
      const payload = new URLSearchParams();
      payload.append("submission", url);
      payload.append("hashtags", hashtags);
      payload.append("city", city);

      await submitChallenge(challenge.challenge_id, payload);
      setNotification({ message: "Submission successful!", type: "success" });
      setUrl("");
      setCity("");
      await fetchChallenge(); // ✅ Re-fetch challenge data
    } catch (err) {
      console.error(err);
      setNotification({ message: "Submission failed", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-6 p-6">
        <div className="w-2/3">
          <Skeleton className="w-full h-64 mb-4" />
          <Skeleton className="w-1/2 h-6" />
        </div>
        <div className="w-1/3">
          <Skeleton className="w-3/4 h-8 mb-4" />
          <Skeleton className="w-full h-20" />
        </div>
      </div>
    );
  }

  if (!challenge) {
    return <p className="p-6 text-red-500">Challenge not found</p>;
  }

  // 🔹 Sort submissions latest first
  const sortedSubmissions = [...(challenge.submissions || [])].sort(
    (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
  );

  return (
    <div>
      {/* Back Button */}
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground"
        onClick={() => router.push("/challenges")}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Left Section */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Title */}
          <h1 className="text-2xl font-semibold">{challenge.challenge_title}</h1>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {challenge.description || "No description available"}
              </p>
            </CardContent>
          </Card>

          {/* Challenge Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <p><strong>Start Date:</strong> {formatIndianDate(challenge.start_date)}</p>
              <p><strong>End Date:</strong> {formatIndianDate(challenge.end_date)}</p>
              <p><strong>Reward:</strong> {challenge.reward_points} pts / {challenge.reward_coins} coins</p>
              <p><strong>Difficulty:</strong> {challenge.difficulty_level}</p>
              {challenge.location && <p><strong>Location:</strong> {challenge.location}</p>}
              {challenge.hashtags && <p><strong>Hashtags:</strong> {challenge.hashtags}</p>}
              <p><strong>Category:</strong> {challenge.category}</p>
              <p><strong>Status:</strong> {challenge.challenge_status}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Section (Submission Form) */}
        <div className="w-full md:w-1/3 pt-10 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Submit Challenge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Enter submission URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Input
                placeholder="Hashtags"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
              />
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                className="w-full cursor-pointer"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Submissions */}
      {sortedSubmissions.length > 0 && (
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Submissions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedSubmissions.map((sub, idx) => {
                const videoId = getYouTubeId(sub.submission_url);
                return (
                  <div key={idx} className="space-y-2 border rounded-lg p-3">
                    {videoId ? (
                      <iframe
                        width="100%"
                        height="250"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Submission Video"
                        className="rounded-lg"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <a
                        href={sub.submission_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 text-sm underline"
                      >
                        {sub.submission_url}
                      </a>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {getStatusBadge(sub.status)}
                        {sub.accept_status ? (
                          <Badge className="bg-blue-500 text-white">✔ Reviewed</Badge>
                        ) : (
                          <Badge className="bg-yellow-500 text-white">⏳ Not Reviewed</Badge>
                        )}
                      </div>
                      <Badge variant="outline">{sub.points_awarded} pts</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Submitted at: {formatIndianDate(sub.submitted_at)}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
