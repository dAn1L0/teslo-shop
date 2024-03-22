'use client';
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useCallback, useEffect, useState } from "react";

interface Props {
  slug: string
}


export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getStock = useCallback(async() => {
    const inStock = await getStockBySlug( slug )
    setStock( inStock )
    setIsLoading(false)
  }, [slug])

  useEffect(() => {
    getStock()
    setIsLoading(true)
  }, [getStock])

  return (
    <>
      {
        !isLoading
        ? (
          <h1 className={`${ titleFont.className } antialiased font-bold text-lg`}>
            {
              `${ +stock >= 1 ? 'En stock: ' : 'No disponible' }
                ${ +stock >= 1 ? stock.toString() : '' }
                ${ +stock >= 1 ? 'u.' : '' }`
            }
          </h1>
        )
        : (
          <h1 className={`${ titleFont.className } antialiased font-bold text-lg bg-gray-300 bg-opacity-30 animate-pulse`}>
            &nbsp;
          </h1>
        )
      }
    </>
  )
}