'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function SignUpAlert() {
  const searchParams = useSearchParams();
  const signedUp = searchParams.get('signedup')
  return (
    signedUp
      ? <Alert className="mb-4">
        <CheckCircle2Icon />
        <AlertTitle>Welcome! You've signed up!</AlertTitle>
        <AlertDescription>
          You will soon get an email that you can use to finish your sign-up process.
        </AlertDescription>
      </Alert>
      : null
  )
}
