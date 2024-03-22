import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  cart: CartProduct[]
  getTotalItems: () => number
  getSummaryInformation: () => { quantityItems: number, subTotal: number, impSubTotal: number, total: number }
  addProductToCart: (product: CartProduct) => void
  updateProductQuantityInCart: (product: CartProduct, newQuantity: number) => void
  removeProductFromCart: (product: CartProduct) => void
  clearCart: () => void
}

export const useCartStore = create<State>()(devtools(
  persist(
    (set, get) => ({
      cart: [],
      //! methods
      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get()
        // revisar si el producto existe con la talla seleccionada
        const isProductInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        )
        if(!isProductInCart) {
          set({ cart: [...cart, product] })
          return
        }
        //  existe el producto en el carrito, solo actualizar la propiedad quantity
        const updatedQuantityProduct = cart.map((item) => {
          if(item.id === product.id && item.size === product.size) {
            return { ...item, quantity: (item.quantity + product.quantity) }
          }
          return item
        })

        set({ cart: updatedQuantityProduct })
      },
      updateProductQuantityInCart: (product: CartProduct, newQuantity: number) => {
        const { cart } = get();
        const updatedQuantityProductInCart = cart.map( (item) => {
          if( item.id === product.id && item.size === product.size ){
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        set({ cart: updatedQuantityProductInCart })
      },
      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get()
        const removedProductInCart = cart.filter( (item) => item.id !== product.id || item.size !== product.size )
        set({ cart: removedProductInCart })
      },
      getSummaryInformation: () => {
        const { cart } = get()
        const quantityItems = cart.reduce((total, item) => total + item.quantity, 0)
        const subTotal = cart.reduce((subtotal, item) => subtotal + (item.price * item.quantity), 0)
        const impSubTotal = subTotal * (Number(process.env.NEXT_PUBLIC_TAX) / 100)
        const total = subTotal + impSubTotal
        return { quantityItems, subTotal, impSubTotal, total }
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'shopping-cart',
      // getStorage: () => sessionStorage
    }
  )
))