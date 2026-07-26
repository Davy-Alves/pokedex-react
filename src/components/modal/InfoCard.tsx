import type { ReactNode } from "react"

interface InfoCardProps {
  title: ReactNode
  children: ReactNode
  className?: string
}

export default function InfoCard({ title, children, className = "" }: InfoCardProps) {
  return (
    <div className={`bg-white/95 p-5 rounded-xl shadow-md border border-white/60 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}