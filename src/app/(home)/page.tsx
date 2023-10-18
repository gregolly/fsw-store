"use client"

import Image from "next/image"
import { Categories } from "./components/categories"

export default function Home() {
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
   </div>
  )
}
