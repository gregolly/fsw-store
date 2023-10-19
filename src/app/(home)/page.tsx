import Image from "next/image"
import { Categories } from "./components/categories"
import { prismaClient } from "@/lib/prisma"
import { ProductList } from "./components/product-list"
import { CopyrightIcon } from "lucide-react"
import { SectionTitle } from "./components/section-title"
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
    <>
      <div className="p-5">
        <BannerSection 
          src="/banner-home-01.png" 
          alt="Ate 55% de desconto esse mes!" 
        />

      <div className="mt-8">
        <Categories />
      </div>

      <div className="mt-8">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <BannerSection 
          src="/banner-home-02.png" 
          alt="Ate 55% de desconto esse mes em mouses!" 
      />

      <div className="mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <BannerSection 
          src="/banner-home-03.png" 
          alt="Ate 20% de desconto em fones!" 
      />

      <div className="mt-8">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
      <footer className="flex gap-1 bg-slate-900 items-center px-8 py-5 text-slate-400 mt-14">
        <CopyrightIcon size={16} /> 2023 Copyright FSW Store
      </footer>
    </>
  )
}
