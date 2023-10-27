import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"

export const Cart = () => {
    const { products } = useContext(CartContext)

    return (
        <div>
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3" 
                variant="outline"
            >
                <ShoppingCartIcon />
                Catalogo
            </Badge>

            {products.map(product => <h1 key={product.id}>{product.name}</h1>)}
        </div>
    )
}