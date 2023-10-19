import Image from "next/image"
import { Categories } from "./components/categories"
import { prismaClient } from "@/lib/prisma"
import { ProductList } from "./components/product-list"

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })

  return (
    <div className="p-5">
      <Image 
        src="/banner-home-01.png" 
        alt="Ate 55% de desconto esse mes!" 
        height={0} 
        width={0}
        sizes="100vw"
        className="w-full h-auto"
      />

    <div className="mt-8">
      <Categories />
    </div>

    <div className="mt-8">
      <h1 className="uppercase font-bold mb-5">Ofertas</h1>
      <ProductList products={deals} />
    </div>
   </div>
  )
}
