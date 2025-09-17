"use client";

import { useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Notification({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 w-80 animate-in fade-in slide-in-from-top-5">
      <Alert
        variant={type === "success" ? "default" : "destructive"}
        className="flex items-start gap-2"
      >
        {type === "success" ? (
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
        )}
        <div>
          <AlertTitle>
            {type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
