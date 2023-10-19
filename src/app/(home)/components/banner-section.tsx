import Image, { ImageProps } from "next/image"

export const BannerSection = ({alt, ...props}: ImageProps) => {
    return (
        <Image 
            height={0} 
            width={0}
            sizes="100vw"
            className="w-full h-auto"
            alt={alt}
            {...props}
        />
    )
}