// components/PolicySection.tsx
import React from 'react'

type PolicySectionProps = {
  title?: string
  children: React.ReactNode
  className?: string
}

// Default export a React component so it can be easily imported in your pages
export default function PolicySection({ title, children, className = '' }: PolicySectionProps) {
  return (
    <section className={`mb-8 bg-gray-900 p-5 sm:p-8 rounded-lg ${className}`}>
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div className="text-gray-300">{children}</div>
    </section>
  )
}
