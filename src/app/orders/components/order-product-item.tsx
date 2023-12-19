import { formattedPrice } from "@/helpers/formattedPrice"
import { computeProductTotalPrice } from "@/helpers/product"
import { Prisma } from "@prisma/client"
import Image from "next/image"

interface OrderProductItemProps {
    orderProduct: Prisma.OrderProductGetPayload<{
        include: {
            product: true
        }
    }>
}

export const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
    const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)

    return (
        <div className="flex items-center gap-4">
            <div className="bg-accent rounded-lg w-[77px] h-[77px] flex items-center justify-center">
                <Image 
                    src={orderProduct.product.imageUrls[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
                    alt={orderProduct.product.name}
                />
            </div>  

            <div className="flex justify-between gap-1 w-full">
                <div className="flex gap-1 w-fit flex-col">
                    <div className="flex bg-accent px-3 py-1 rounded-md">
                        <p className="text-[10px]">Vendido e entregue por {" "} <span>FSW Store</span></p>
                    </div>

                    <p className="text-xs">{orderProduct.product.name}</p>

                    <div className="flex items-center gap-1">
                        <p className="text-sm font-bold">{formattedPrice(productWithTotalPrice.totalPrice)}</p>
                        {productWithTotalPrice.discountPercentage > 0 && (
                            <p className="opacity-60 line-through text-xs">
                                {formattedPrice(Number(productWithTotalPrice.basePrice))}
                            </p>
                        )}
                    </div>
                </div>
                <p className="text-xs opacity-60">Qtd: {orderProduct.quantity}</p>
            </div>
        </div>
    )
}