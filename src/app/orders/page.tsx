import { Badge } from "@/components/ui/badge"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/prisma"
import { PackageSearchIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import { OrderItem } from "./components/order-items"

const OrderPage = async () => {
    const user = getServerSession(authOptions)

    if (!user) {
        return <p>Access Denied</p>
    }

    const orders = await prismaClient.order.findMany({
        where: {
            userId: (user as any).id
        },
        include: {
            orderProducts: {
                include: { product: true }
            }
        }
    })
    
    return (
        <div className="p-5">
            <Badge className="w-fit mb-4 gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant="outline">
                <PackageSearchIcon size={16} />
                Meus pedidos
            </Badge>

            <div className="flex flex-col gap-5 mt-5">
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} />
                ))}
            </div>
        </div>

    )
}

export default OrderPage