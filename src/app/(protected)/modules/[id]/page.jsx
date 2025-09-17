"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getModuleById, submitModule } from "@/src/api/modules";
import Notification from "@/src/components/Notification/Notification";
import { ChevronLeft } from "lucide-react";

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
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

  const fetchModule = async () => {
  try {
    const res = await getModuleById(id);
    setModuleData(res.data);
  } catch (error) {
    console.error("Error fetching module:", error);
    const backendMessage =
      error?.response?.data?.message || error?.message || "Failed to fetch module";

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

      // 🔹 Safely extract backend error message
      const backendMessage =
        err?.response?.data?.message || // common pattern if backend returns { message }
        err?.message ||                 // fallback to error.message
        "Submission failed";

      setNotification({ message: backendMessage, type: "error" });
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

  if (!moduleData) {
    return <p className="p-6 text-red-500">Module not found</p>;
  }

  return (
    <div>
      {/* Back Button */}
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground"
        onClick={() => router.push("/modules")}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Left Section */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Title */}
          <h1 className="text-2xl font-semibold">{moduleData.title}</h1>
          <h1 className="text-base text-muted-foreground">{moduleData.description}</h1>

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

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {moduleData.documentation || "No description available"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
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

          {moduleData.submissions?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Submissions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                {moduleData.submissions.map((sub, idx) => {
                  const videoId = getYouTubeId(sub.submission);
                  return (
                    <div key={idx} className="space-y-2">
                      {videoId ? (
                        <iframe
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title="Submission Video"
                          className="rounded-lg"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <a
                          href={sub.submission}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 text-sm underline"
                        >
                          {sub.submission}
                        </a>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
