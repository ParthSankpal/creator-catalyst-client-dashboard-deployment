"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  getChallengeById,
  submitChallenge,
  startChallenge,
} from "@/src/api/challenges"

import SubmitChallengeModal from "../SubmitChallengeModal/SubmitChallengeModal"

// utils
import {
  getChallengeStatus,
  getTimeRemaining,
  formatDuration,
  getChallengeColors,
  getEmojiForChallenge,
} from "@/src/utils/challenges"
import Loader from "../../Loader/Loader"
import PreviousSubmissionsModal from "../PreviousSubmissionsModal/PreviousSubmissionsModal"

export default function ChallengeDetail() {
  const { id } = useParams()
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [starting, setStarting] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false)

  // 🔹 Refetch wrapper
  const fetchChallenge = async () => {
    setLoading(true)
    try {
      const res = await getChallengeById(id)
      setChallenge(res?.data)
    } catch (err) {
      console.error("Failed to fetch challenge", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchChallenge()
  }, [id])

  const handleStart = async () => {
    setStarting(true)
    try {
      await startChallenge(challenge.challenge_id)
      await fetchChallenge() // ✅ Refetch latest state
    } catch (err) {
      console.error("Failed to start challenge ❌", err)
      alert("Could not start challenge")
    } finally {
      setStarting(false)
    }
  }

  const handleSubmit = async (data) => {
    setSubmitting(true)
    try {
      const payload = new URLSearchParams()
      payload.append("submission", data.submission)
      payload.append("hashtags", data.hashtags)
      payload.append("city", data.city)

      await submitChallenge(challenge.challenge_id, payload)
      alert("Challenge submitted ✅")
      setShowSubmitModal(false)
      await fetchChallenge() // ✅ Refetch after submit
    } catch (err) {
      console.error("Submit error:", err)
      alert("Failed to submit challenge ❌")
    } finally {
      setSubmitting(false)
    }
  }

  // 🔹 Loading skeleton
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!challenge) {
    return <p className="text-center mt-8">No challenge found ❌</p>
  }

  // ✅ Enrich challenge with utils
  const status = getChallengeStatus(challenge)
  const { borderColor, badgeColor } = getChallengeColors(status)
  const timeRemaining = getTimeRemaining(challenge.end_date)
  const duration = formatDuration(challenge.start_date, challenge.end_date)
  const emoji = getEmojiForChallenge(
    challenge.challenge_title,
    challenge.difficulty_level
  )

  return (

    <div className=" max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
      <div className=" flex justify-end">
        {challenge.submissions?.length > 0 && (
          <Button
            variant="outline"
            className=" cursor-pointer"
            onClick={() => setShowSubmissionsModal(true)}
          >
            View Submissions
          </Button>
        )}
      </div>
      <div className="max-w-3xl mx-auto p-6">
        {(submitting || starting) && <Loader />}




        <Card className={`shadow-lg border-2 ${borderColor}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {emoji} {challenge.challenge_title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={badgeColor}>{status}</Badge>
              <Badge variant="secondary">{challenge.category}</Badge>
              <Badge variant="outline">
                Difficulty: {challenge.difficulty_level}
              </Badge>
              {challenge.location && (
                <Badge variant="outline">{challenge.location}</Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {challenge.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Start Date</p>
                <p>{challenge.start_date}</p>
              </div>
              <div>
                <p className="font-medium">End Date</p>
                <p>{challenge.end_date}</p>
              </div>
              <div>
                <p className="font-medium">Duration</p>
                <p>{duration}</p>
              </div>
              <div>
                <p className="font-medium">Time Left</p>
                <p>{timeRemaining}</p>
              </div>
              <div>
                <p className="font-medium">Reward Points</p>
                <p>{challenge.reward_points}</p>
              </div>
              <div>
                <p className="font-medium">Reward Coins</p>
                <p>{challenge.reward_coins}</p>
              </div>
            </div>

            {challenge.hastags && (
              <div>
                <p className="font-medium">Hashtags</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {challenge.hastags}
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-4 justify-end">
              {challenge.progress_status === "not_started" && (
                <Button onClick={handleStart} disabled={starting}>
                  {starting ? "Starting..." : "Start Challenge"}
                </Button>
              )}



              {challenge.progress_status === "completed" && (
                <Badge className="bg-green-500 text-white">
                  ✅ Challenge Completed
                </Badge>
              )}

              {challenge.progress_status !== "not_started" && (
                <Button
                  onClick={() => setShowSubmitModal(true)}
                  disabled={submitting}
                >
                  {challenge.submissions?.length > 0
                    ? "Add Another Submission"
                    : "Submit Challenge"}
                </Button>
              )}



            </div>
          </CardContent>
        </Card>

        {/* Submit Modal */}
        <SubmitChallengeModal
          open={showSubmitModal}
          onClose={setShowSubmitModal}
          location={challenge.location}
          onSubmit={handleSubmit}
          hashTags={challenge.hastags}
          loading={submitting}
        />

        {/* Previous Submissions Modal */}
        <PreviousSubmissionsModal
          open={showSubmissionsModal}
          onClose={() => setShowSubmissionsModal(false)}
          submissions={challenge.submissions || []}
          challenge={challenge}
        />

      </div>
    </div>
  )
}
