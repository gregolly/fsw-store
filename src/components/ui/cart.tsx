import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import { CartItem } from "./cart-items"
import { computeProductTotalPrice } from "@/helpers/product"
import { useSession } from "next-auth/react"
import { Separator } from "./separator"
import { formattedPrice } from "@/helpers/fomattedPrice"
import { ScrollArea } from "./scroll-area"
import { Button } from "./button"

export const Cart = () => {
    const { data } = useSession()
    const { products, subtotal, total, totalDiscount } = useContext(CartContext)

    return (
        <div className="flex flex-col gap-8 h-full">
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3" 
                variant="outline"
            >
                <ShoppingCartIcon />
                Carrinho
            </Badge>

            <div className="flex flex-col gap-5 h-full max-h-full overflow-hidden">
                <ScrollArea className="h-full">
                    <div>
                        {products.length > 0 ? (
                            products.map(product => 
                            <CartItem 
                                key={product.id} 
                                product={computeProductTotalPrice(product as any) as any} 
                            />
                        )
                        ) : (
                            <p className="text-center font-semibold text-gray-400 text-sm">Carrinho vazio.</p>
                        )}
                    </div>
                </ScrollArea>
            </div>

            <div className="flex flex-col gap-5">
                    <Separator />

                    <div className="flex items-center justify-between text-xs">
                        <p>Total</p>
                        <p>{products.length > 0 ? formattedPrice(subtotal) : ""}</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-xs">
                        <p>Entrega</p>
                        <p>Gratis</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-xs">
                        <p>Desconto</p>
                        <p>- {formattedPrice(totalDiscount)}</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-sm font-bold">
                        <p>Total</p>
                        <p>Total: {products.length > 0 ? formattedPrice(total) : ""}</p>
                    </div>

                    <Button className="uppercase font-bold mt-7">Finalizar compra</Button>
            </div>
        </div>
    )
}