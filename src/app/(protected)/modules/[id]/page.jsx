"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Skeleton } from "@/components/ui/skeleton"; // ✅ import skeleton
import { completeModule, getCreatorModulSubmissions, getModuleById, startModule, submitModule } from "@/src/api/modules";

export default function ModuleDetailsPage() {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [viewSubmissionsOpen, setViewSubmissionsOpen] = useState(false);
  const [newLink, setNewLink] = useState("");

  // Convert YouTube watch URL → embed
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = new URL(url).searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moduleRes, submissionsRes] = await Promise.all([
          getModuleById(id),
          
          getCreatorModulSubmissions(id),
        ]);

        console.log(moduleRes);
        
        setModule(moduleRes.data);
        setSubmissions(submissionsRes.data || []);
      } catch (err) {
        console.error("Error fetching module:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleStart = async () => {
    try {
      const startRes = await startModule(id);
      console.log(startRes);
      
      alert("Module started!");
    } catch (err) {
      console.error("Error starting module:", err);
    }
  };

  const handleComplete = async () => {
    try {
      await completeModule(id);
      alert("Module marked as completed!");
    } catch (err) {
      console.error("Error completing module:", err);
    }
  };

  const handleSubmit = async () => {
    if (!newLink) return alert("Please enter a YouTube link.");
    try {
      await submitModule(id, { link: newLink });
      alert("Submission added!");
      setSubmissionModalOpen(false);
      setNewLink("");
      const subs = await getCreatorModulSubmissions(id);
      setSubmissions(subs.data || []);
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{module?.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {module?.video_url && (
            <iframe
              src={getEmbedUrl(module.video_url)} // ✅ fixed embed issue
              title="Module Video"
              className="w-full h-64 rounded-lg"
              allowFullScreen
            />
          )}
          <p><strong>Documentation:</strong> {module?.documentation}</p>
          <p><strong>Activity:</strong> {module?.activity}</p>
          <p><strong>Reward Points:</strong> {module?.reward_points_can_achieve}</p>
          <p><strong>Status:</strong> {module?.status}</p>

          {/* Buttons depending on submissions */}
          {submissions.length === 0 ? (
            <Button className=" cursor-pointer" onClick={handleStart}>Start Module</Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setSubmissionModalOpen(true)}>Add Submission</Button>
              <Button onClick={() => setViewSubmissionsOpen(true)}>View Submissions</Button>
              <Button variant="secondary" onClick={handleComplete}>
                Mark as Complete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Submission Modal */}
      <Dialog open={submissionModalOpen} onOpenChange={setSubmissionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Submission</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter YouTube link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Submissions Modal */}
      <Dialog open={viewSubmissionsOpen} onOpenChange={setViewSubmissionsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submissions</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {submissions.length > 0 ? (
              submissions.map((sub, idx) => (
                <a
                  key={idx}
                  href={sub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {sub.link}
                </a>
              ))
            ) : (
              <p>No submissions yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
