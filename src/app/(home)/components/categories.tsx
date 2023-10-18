"use client"

import { prismaClient } from "@/lib/prisma"
import { CategoryItem } from "./category-item"

export const Categories = async () => {
    const categories = await prismaClient.category.findMany({})
    const newCategories = [...categories]
    newCategories.shift()

    return (
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {newCategories.map(category => <CategoryItem category={category} key={category.id} />)}
        </div>
    )
}