import type { Product } from '@/interfaces'
import { ProductGridItem } from './ProductGridItem'

interface Props {
  products: Product[]
}

export const ProductGrid = ({ products }:Props) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 mb-10">
      {
        products.map( (product, index) => (
          <ProductGridItem
            key={ product.slug }
            product={ product }
            priority={ index <= 4 ? true : false }
            // priority={ product.images[0].endsWith('A_0_2000.jpg') ? true : false }
          />
        ))
      }
    </div>
  )

}