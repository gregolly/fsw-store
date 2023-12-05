import { CartContext, CartProduct } from "@/providers/cart"
import Image from "next/image"
import { useContext } from "react"
import { Button } from "./button"
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react"
import { formattedPrice } from "@/helpers/formattedPrice"

interface CartItemProps {
    product: CartProduct
}

export const CartItem = ({ product }: CartItemProps) => {
    const firstImageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : ""

    const {
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
    } = useContext(CartContext)

    const handleDecreaseProductQuantityClick = () => {
        decreaseProductQuantity(product.id)
    }

    const handleIncreaseProductQuantityClick = () => {
        increaseProductQuantity(product.id)
    }

    const handleRemoveProductClick = () => {
        removeProductFromCart(product.id)
    }

    return (
        <div className="flex items-center justify-between pb-3">
            <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
                <Image
                    src={firstImageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={product.name}
                    className="h-auto max-h-[70%] w-auto max-w-[80%]"
                />
            </div>

            <div className="flex flex-col">
                <p className="text-xs">{product.name}</p>

                <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">
                        {formattedPrice(product.totalPrice)}
                    </p>
                    {product.discountPercentage > 0 && (
                    <p className="text-xs line-through opacity-75">
                        {formattedPrice(Number(product.basePrice))}
                    </p>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={handleDecreaseProductQuantityClick}
                    >
                        <ArrowLeftIcon size={16} />
                    </Button>

                    <span className="text-xs">{product.quantity}</span>

                    <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={handleIncreaseProductQuantityClick}
                    >
                        <ArrowRightIcon size={16} />
                    </Button>
                </div>
            </div>

            <Button size="icon" variant="outline" onClick={handleRemoveProductClick}>
                <TrashIcon size={16} />
            </Button>
        </div>
    )
}