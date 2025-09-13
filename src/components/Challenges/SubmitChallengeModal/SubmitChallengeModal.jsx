"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export default function SubmitChallengeModal({
  open,
  onClose,
  location,
  onSubmit,
  loading,
  hashTags = "", // 👈 pass default hashtags from challenge
}) {
  const [formData, setFormData] = useState({
    submission: "",
    hashtags: hashTags || "", // pre-fill hashtags
    city: location || "",
  })

  // Sync hashtags if challenge changes
  useEffect(() => {
    if (hashTags) {
      setFormData((prev) => ({ ...prev, hashtags: hashTags }))
    }
  }, [hashTags])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Normalize hashtags into string with commas
    const payload = {
      ...formData,
      hashtags: formData.hashtags.trim(),
    }

    onSubmit(payload)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Your Challenge</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="YouTube link"
            value={formData.submission}
            onChange={(e) =>
              setFormData({ ...formData, submission: e.target.value })
            }
            required
          />

          <div className="space-y-1">
            <Input
              placeholder="#challenge #fun"
              value={formData.hashtags}
              onChange={(e) =>
                setFormData({ ...formData, hashtags: e.target.value })
              }
            />
            <p className="text-xs text-gray-500">
              You can add your own hashtags (separate with commas or spaces).
            </p>
          </div>

          <Input
            value={formData.city}
            readOnly
            className="bg-muted cursor-not-allowed"
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
