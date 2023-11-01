import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import { CartItem } from "./cart-items"
import { computeProductTotalPrice } from "@/helpers/product"
import { useSession } from "next-auth/react"

export const Cart = () => {
    const { data } = useSession()
    const { products, subtotal, total, totalDiscount } = useContext(CartContext)

    return (
        <div className="flex flex-col gap-8">
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3" 
                variant="outline"
            >
                <ShoppingCartIcon />
                Catalogo
            </Badge>

            <div className="flex flex-col gap-5">
                {products.map(product => 
                    <CartItem 
                        key={product.id} 
                        product={computeProductTotalPrice(product as any) as any} 
                     />
                )}
            </div>
        </div>
    )
}