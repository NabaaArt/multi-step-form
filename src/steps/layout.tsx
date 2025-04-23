import type React from "react"
import { Card } from "@/components/ui/card"

export default function StepsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container flex  flex-col items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-3xl">
  
        {children}
      </Card>
    </div>
  )
}
