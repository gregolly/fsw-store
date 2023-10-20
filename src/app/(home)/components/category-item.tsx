import { Badge } from "@/components/ui/badge"
import { categoryIcon } from "@/constants/category-icon"
import { Category } from "@prisma/client"
import Link from "next/link"
interface CategoryItemProps {
    category: Category
}

export const CategoryItem = ({ category }: CategoryItemProps) => {

    return (
        <Link href={`/category/${category.slug}`}>
            <Badge variant="outline" className="py-3 flex justify-center items-center gap-2 rounded-lg">
                {categoryIcon[category.slug as keyof typeof categoryIcon]}
                <span className="font-semibold text-xs">{category.name}</span>
            </Badge>
        </Link>
    )
}