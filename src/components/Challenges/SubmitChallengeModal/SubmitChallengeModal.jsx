"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SubmitChallengeModal({ location, onSubmit }) {
  const [open, setOpen] = useState(true) // 👈 keep it open
  const [formData, setFormData] = useState({
    submission: "",
    hashtags: "",
    city: location || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setOpen(false) // close after submit
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* we skip <DialogTrigger> so it always shows */}
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
          <Input
            placeholder="#challenge #fun"
            value={formData.hashtags}
            onChange={(e) =>
              setFormData({ ...formData, hashtags: e.target.value })
            }
          />
          <Input
            value={formData.city}
            readOnly
            className="bg-muted cursor-not-allowed"
          />
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
