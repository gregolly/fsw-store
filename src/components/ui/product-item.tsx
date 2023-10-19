import { formattedPrice } from "@/helpers/fomattedPrice"
import { ProductsWithTotalPrice } from "@/helpers/product"
import Image from 'next/image'
import { Badge } from "./badge"
import { ArrowDownIcon } from "lucide-react"

interface ProductItemProps {
    product: ProductsWithTotalPrice
}

export const ProductItem = ({ product }: ProductItemProps) => {
    const firstImage = product.imageUrls[0]

    return (
        <div className="flex flex-col gap-4">
            <div className="relative bg-accent rounded-lg h-[170px] w-[156px] flex items-center justify-center max-w-[156px]">
                <Image 
                    src={firstImage} 
                    alt={product.name} 
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto w-auto max-h-[70%] max-w-[80%]"
                    style={{
                        objectFit: 'contain'
                    }}
                />

                {product.discountPercentage > 0 && (
                    <Badge className="absolute left-2 top-2 px-2 py-[2px]">
                    <ArrowDownIcon size={16}/> {product.discountPercentage}%
                    </Badge>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis text-xs text-white font-bold-400">
                    {product.name}
                </p>

                <div className="flex items-center gap-2">
                    {product.discountPercentage > 0 ? (
                        <>
                            <p className="font-semibold text-base">{formattedPrice(product.totalPrice)}</p>

                            <p className="opacity-75 line-through text-xs">{formattedPrice(Number(product.basePrice))}</p>
                        </>
                    ) : (
                        <p className="text-gray-400 line-through text-xs">{formattedPrice(Number(product.basePrice))}</p>
                    )}
                </div>
            </div>
        </div>
    )
}