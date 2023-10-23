import { Categories } from "./components/categories"
import { prismaClient } from "@/lib/prisma"
import { ProductList } from "@/components/ui/product-list"
import { SectionTitle } from "@/components/ui/section-title"
import { BannerSection } from "./components/banner-section"

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards'
      }
    }
  })

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'mouses'
      }
    }
  })

  return (
    <div className="p-5 flex flex-col gap-8">
        <BannerSection 
          src="/banner-home-01.png" 
          alt="Ate 55% de desconto esse mes!" 
        />

      <div>
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <BannerSection 
          src="/banner-home-02.png" 
          alt="Ate 55% de desconto esse mes em mouses!" 
      />

      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <BannerSection 
          src="/banner-home-03.png" 
          alt="Ate 20% de desconto em fones!" 
      />

      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}
