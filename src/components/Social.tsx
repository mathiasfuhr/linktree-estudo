import { ReactNode } from "react"

interface SocialProps {
  url: string,
  children: ReactNode
}

const Social = ({ url, children }: SocialProps) => {
  return (
    <div className=''>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </div>
  )
}

export default Social