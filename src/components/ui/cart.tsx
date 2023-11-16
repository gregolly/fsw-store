import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import { CartItem } from "./cart-items"
import { computeProductTotalPrice } from "@/helpers/product"
import { Separator } from "./separator"
import { formattedPrice } from "@/helpers/fomattedPrice"
import { ScrollArea } from "./scroll-area"
import { Button } from "./button"
import { createCheckout } from "@/actions/checkout"
import { loadStripe } from "@stripe/stripe-js"

export const Cart = () => {
    const { products, subtotal, total, totalDiscount } = useContext(CartContext)

    const handleFinishPurchaseClick = async () => {
        const checkout = await createCheckout(products)

        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        )

        stripe?.redirectToCheckout({
            sessionId: checkout.id
        })
    }

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
                        <p>{products.length > 0 ? "-" + formattedPrice(totalDiscount) : ""}</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-sm font-bold">
                        <p>Total</p>
                        <p>{products.length > 0 ? formattedPrice(total) : ""}</p>
                    </div>

                    <Button onClick={handleFinishPurchaseClick} className="uppercase font-bold mt-7">Finalizar compra</Button>
            </div>
        </div>
    )
}