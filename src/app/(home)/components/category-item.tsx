import { Badge } from "@/components/ui/badge"
import { categoryIcon } from "@/constants/category-icon"
import { Category } from "@prisma/client"
interface CategoryItemProps {
    category: Category
}

export const CategoryItem = ({ category }: CategoryItemProps) => {

    return (
        <Badge variant="outline" className="py-3 flex justify-center items-center gap-2 rounded-lg">
            {categoryIcon[category.slug as keyof typeof categoryIcon]}
            <span className="font-semibold text-xs">{category.name}</span>
        </Badge>
    )
}