"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// utils
import {
  getChallengeStatus,
  getChallengeColors,
  getEmojiForChallenge,
  formatDuration,
  getTimeRemaining,
} from "@/src/utils/challenges"
import { formatIndianDate } from "@/src/utils/validation"

export default function PreviousSubmissionsModal({
  open,
  onClose,
  submissions,
  challenge,
}) {
  if (!challenge) return null

  const status = getChallengeStatus(challenge)
  const { borderColor, badgeColor } = getChallengeColors(status)
  const emoji = getEmojiForChallenge(
    challenge.challenge_title,
    challenge.difficulty_level
  )
  const duration = formatDuration(challenge.start_date, challenge.end_date)
  const timeLeft = status === "active" ? getTimeRemaining(challenge.end_date) : null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            {emoji} {challenge.challenge_title}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={badgeColor}>{status}</Badge>
            <Badge variant="outline">Difficulty: {challenge.difficulty_level}</Badge>
            {challenge.category && (
              <Badge variant="secondary">{challenge.category}</Badge>
            )}
          </div>
        </DialogHeader>

        {/* Challenge Info */}
        <div className={`border rounded-lg p-4 mb-6 ${borderColor}`}>
          <p className="text-sm text-muted-foreground mb-2">
            {challenge.description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-medium">Duration</p>
              <p>{duration}</p>
            </div>
            <div>
              <p className="font-medium">Reward Points</p>
              <p>{challenge.reward_points}</p>
            </div>
            <div>
              <p className="font-medium">Reward Coins</p>
              <p>{challenge.reward_coins}</p>
            </div>
            {timeLeft && (
              <div>
                <p className="font-medium">Time Left</p>
                <p>{timeLeft}</p>
              </div>
            )}
          </div>
        </div>

        {/* Submissions Table */}
        {submissions?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Submission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Points Awarded</TableHead>
                <TableHead>Submitted At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>
                    <a
                      href={s.submission_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.status === "submitted"
                          ? "secondary"
                          : s.status === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{s.points_awarded}</TableCell>
                  <TableCell>
                    {formatIndianDate(s.submitted_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-sm">
            No submissions found.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
