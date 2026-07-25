import type { ReactNode, ElementType } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}

export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: RevealProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
