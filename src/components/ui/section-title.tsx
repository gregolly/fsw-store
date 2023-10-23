import { ComponentProps } from 'react'

export const SectionTitle = ({ children, ...props }: ComponentProps<"h1">) => {
    return (
        <h1 className="uppercase font-bold mb-2" {...props}>{children}</h1>
    )
}