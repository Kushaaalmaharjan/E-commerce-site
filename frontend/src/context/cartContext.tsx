import { createContext,useState,useContext } from "react"
import type { ReactNode } from "react"

type CartItem = {
    _id : string,
    name: string,
    image: string,
    price: number,
    qty: number,
}

type CartContextType = {
    cartItems: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: {children: ReactNode}){
    const [cartItems, setCartItems] = useState<CartItem[]>([])

     const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const exists = prev.find(x => x._id === item._id)
      if (exists) {
        return prev.map(x => x._id === item._id ? { ...x, qty: x.qty + 1 } : x)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }


    const removeFromCart = (id: string) => {
        setCartItems(prev=> prev.filter(x => x._id !== id))
    }

    const clearCart = () => setCartItems([])

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
        )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}


