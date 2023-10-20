import { Badge } from "@/components/ui/badge"
import { ProductItem } from "@/components/ui/product-item"
import { categoryIcon } from "@/constants/category-icon"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"

const CategoryProducts = async ({ params }: any) => {
    const category = await prismaClient.category.findFirst({
        where: {
            slug: params.slug
        },
        include: {
            products: true
        }
    })

    if(!category) return null

    return (
        <div className="p-5 flex flex-col gap-8">
            <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant="outline">
                {categoryIcon[params.slug as keyof typeof categoryIcon]}
                {params.slug}
            </Badge>

            <div className="grid grid-cols-2 gap-8">
                {category.products.map(product => <ProductItem key={product.id} product={computeProductTotalPrice(product)} />)}
            </div>
        </div>
    )
}

export default CategoryProducts