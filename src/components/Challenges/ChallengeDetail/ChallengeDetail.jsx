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
import { getChallengeById, submitChallenge } from "@/src/api/challenges"
import SubmitChallengeModal from "../SubmitChallengeModal/SubmitChallengeModal"

export default function ChallengeDetail() {
  const { id } = useParams()
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await getChallengeById(id)
        setChallenge(res?.data) // your API wraps inside data
      } catch (err) {
        console.error("Failed to fetch challenge", err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchChallenge()
  }, [id])

  const handleSubmit = async (data) => {
    setSubmitting(true)
    try {
      await submitChallenge(challenge.id, data)
      alert("Challenge submitted ✅")
    } catch (err) {
      console.error(err)
      alert("Failed to submit challenge ❌")
    } finally {
      setSubmitting(false)
    }
  }

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {challenge.challenge_title}
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{challenge.status}</Badge>
            <Badge variant="secondary">
              {challenge.category}
            </Badge>
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

          <div className="mt-6 flex justify-end">
            <SubmitChallengeModal
              location={challenge.location}
              onSubmit={handleSubmit}
              loading={submitting}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
