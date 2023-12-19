import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Prisma } from "@prisma/client"
import { format } from 'date-fns'
import { OrderProductItem } from "./order-product-item"
import { Separator } from "@/components/ui/separator"
import { useMemo } from 'react'
import { formattedPrice } from "@/helpers/formattedPrice"
import { computeProductTotalPrice } from "@/helpers/product"

interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: { product: true }
            }
        }
    }>
}

export const OrderItem = ({ order }: OrderItemProps) => {
    const subtotal = useMemo(() => {
        return order.orderProducts.reduce((acc, orderProduct) => {
            return acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
        }, 0)
    }, [order.orderProducts])

    const total = useMemo(() => {
        return order.orderProducts.reduce((acc, product) => {
            const productWithTotalPrice = computeProductTotalPrice(product.product)
          return acc +  productWithTotalPrice.totalPrice * product.quantity
        }, 0);
      }, [order.orderProducts])

    const totalDiscount = subtotal - total

    return (
        <Card className="px-5">
            <Accordion type="single" className="w-full" collapsible>
                <AccordionItem value={order.id}>
                    <AccordionTrigger>
                        <div className="flex flex-col gap-1 text-left">
                            Pedido com {order.orderProducts.length} produto(s)
                        </div>
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div className="font-bold">
                                    <p>Status</p>
                                    <p className="text-[#8162FF]">{order.status}</p>
                                </div>

                                <div>
                                    <p className="font-bold">Data</p>
                                    <p className="opacity-60">{format(order.createdAt, "d/MM/y")}</p>
                                </div>

                                <div>
                                    <p className="font-bold">Pagamento</p>
                                    <p className="opacity-60">Cartao</p>
                                </div>
                            </div>
                            {order.orderProducts.map(orderProduct => (
                                <OrderProductItem key={orderProduct.id} orderProduct={orderProduct} />
                            ))}

                            <div className="flex flex-col gap-1 text-xs">
                                <Separator />
                                <div className="flex justify-between w-full py-3">
                                    <p>Subtotal</p>
                                    <p>{formattedPrice(subtotal)}</p>
                                </div>
                                <Separator />
                                <div className="flex justify-between w-full py-3">
                                    <p>Entrega</p>
                                    <p>GRATIS</p>
                                </div>
                                <Separator />
                                <div className="flex justify-between w-full py-3">
                                    <p>Descontos</p>
                                    <p>- {formattedPrice(totalDiscount)}</p>
                                </div>
                                <Separator />
                                <div className="flex justify-between w-full py-3 text-sm font-bold">
                                    <p>Total</p>
                                    <p>{formattedPrice(total)}</p>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}