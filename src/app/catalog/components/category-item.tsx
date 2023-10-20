import { Category } from "@prisma/client"
import Image from "next/image"
import Link from 'next/link'

interface CategoryItemProps {
    category: Category
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
    return (
        <Link href={`/category/${category.slug}`}>
            <div className="flex flex-col">
                <div className="w-full h-[150px] rounded-tl-lg rounded-tr-lg flex items-center justify-center bg-category-item-gradient">
                    <Image 
                        src={category.imageUrl} 
                        alt={category.slug} 
                        width={0} 
                        height={0} 
                        sizes="100vw" 
                        className="h-auto max-h-[70%] w-auto max-w-[80%]" 
                        style={{
                            objectFit: 'contain'
                        }}
                    />
                </div>
                <div className="rounded-bl-lg rounded-br-lg bg-accent py-3">
                    <p className="text-center text-sm font-semibold">{category.name}</p>
                </div>
            </div>
        </Link>
    )
}