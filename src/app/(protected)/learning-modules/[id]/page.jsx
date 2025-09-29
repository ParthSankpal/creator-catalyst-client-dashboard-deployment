"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { completeModule, getModuleById, submitModule } from "@/src/api/modules";
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

export default function ModuleDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [complete, setComplete] = useState(false)
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

  const fetchModule = async () => {
    try {
      const res = await getModuleById(id);
      setModuleData(res.data);
    } catch (error) {
      console.error("Error fetching module:", error);
      const backendMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch module";

      setNotification({ message: backendMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModule();
  }, [id]);

  const handleSubmit = async () => {
    if (!url) {
      setNotification({ message: "Please enter a YouTube URL", type: "error" });
      return;
    }
    setSubmitting(true);
    try {
      await submitModule(id, url);
      setNotification({ message: "Submission successful!", type: "success" });
      setUrl("");
      await fetchModule(); // ✅ Re-fetch module data
    } catch (err) {
      console.error("Submit Error:", err);

      const backendMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Submission failed";

      setNotification({ message: backendMessage, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true); // ✅ mark submitting
    try {
      await completeModule(id);
      setNotification({ message: "Module marked as complete!", type: "success" });
      setComplete(true); // ✅ now mark as completed
      await fetchModule(); // ✅ refresh data
    } catch (err) {
      console.error("Complete Error:", err);
      const backendMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to mark complete";
      setNotification({ message: backendMessage, type: "error" });
    } finally {
      setCompleting(false);
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

  if (!moduleData) {
    return <p className="p-6 text-red-500">Module not found</p>;
  }

  return (
    <div>
      {/* Back Button */}
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground"
        onClick={() => router.push("/learning-modules")}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Left Section */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Title */}
          <h1 className="text-2xl font-semibold">{moduleData.title}</h1>
          <h1 className="text-base text-muted-foreground">
            {moduleData.description}
          </h1>

          {/* Video */}
          <div>
            {moduleData.video_url ? (
              <iframe
                width="100%"
                height="400"
                src={moduleData.video_url.replace("watch?v=", "embed/")}
                title="Module Video"
                className="rounded-lg w-full"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-muted-foreground">No video available</p>
            )}
          </div>

          {/* Documentation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {moduleData.documentation || "No description available"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Activity + Submission */}
        <div className="w-full md:w-1/3 pt-10 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {moduleData.activity || "No activity defined"}
              </p>

              {/* ✅ Submission Section */}
              <div className="space-y-3">
                <Input
                  placeholder="Enter YouTube submission URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                  onClick={handleSubmit}
                  className="w-full cursor-pointer"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Mark as Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  onClick={handleComplete} // ✅ fixed (was handleSubmit)
                  className="w-full cursor-pointer"
                  disabled={submitting || complete}
                >
                  {completing ? "Completing..." : complete ? "Completed" : "Complete"}
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ✅ Recent Submissions - moved BELOW */}
      {/* ✅ Recent Submissions - YouTube style grid with description + points */}
      {moduleData.submissions?.length > 0 && (
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {moduleData.submissions.map((sub, idx) => {
                  let thumbnail = null;
                  try {
                    const parsedThumb = JSON.parse(sub.thumbnail || "{}");
                    thumbnail = parsedThumb?.medium || parsedThumb?.default || null;
                  } catch (e) {
                    thumbnail = null;
                  }

                  return (
                    <div
                      key={idx}
                      className="flex flex-col bg-card rounded-lg shadow-sm hover:shadow-md transition p-2"
                    >
                      {/* Thumbnail */}
                      <a
                        href={sub.submission}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={sub.title || "Submission thumbnail"}
                            className="w-full h-40 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-full h-40 bg-muted flex items-center justify-center rounded-md text-sm text-muted-foreground">
                            No Thumbnail
                          </div>
                        )}
                      </a>

                      {/* Info */}
                      <div className="mt-2 space-y-1">
                        {/* Title */}
                        <a
                          href={sub.submission}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-sm line-clamp-2 hover:underline"
                        >
                          {sub.title || "Untitled Submission"}
                        </a>

                        {/* Channel + Date */}
                        <p className="text-xs text-muted-foreground">
                          {sub.channel_title || "Unknown Channel"} •{" "}
                          {sub.published_at
                            ? formatIndianDate(sub.published_at)
                            : "No date"}
                        </p>

                        {/* ✅ Description */}
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {sub.description || "No description available"}
                        </p>

                        {/* ✅ Points */}
                        <p className="text-xs text-blue-600 font-medium">
                          🎯 {sub.points_awarded || 0} pts
                        </p>

                        {/* Status */}
                        <p
                          className={`text-xs font-semibold ${sub.status === "accepted"
                            ? "text-green-600"
                            : sub.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                            }`}
                        >
                          {sub.status === "accepted"
                            ? "✅ Accepted"
                            : sub.status === "rejected"
                              ? `❌ Rejected ${sub.rejected_reason ? `(${sub.rejected_reason})` : ""
                              }`
                              : "⏳ Pending Review"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
