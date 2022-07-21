import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

const FadeIn = ({children}: Props) => {
  return (
    <div className="animate-fadein">
        {children}
    </div>
  )
}

export default FadeIn