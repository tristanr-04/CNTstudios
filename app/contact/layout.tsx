import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | CNTstudios",
  description:
    "Vraag een gratis analyse aan. We regelen dit binnen 1 week; live gaan kan vaak binnen 2 weken.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
