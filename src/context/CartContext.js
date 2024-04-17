import { createContext, useContext, useState } from 'react'

const CartContext = createContext({
  cart: [],
  addCartItem: () => { },
  removeCartItem: () => { },
  incrementCartItemQuantity: () => { },
  decrementCartItemQuantity: () => { },
  removeAllCartItems: () => { },
})

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addCartItem = payload => {
    setCart(prev => [...prev, payload])
  }

  const removeCartItem = id => {
    const remove = cart.filter(item => item.id !== id)
    setCart(remove)
  }

  const incrementCartItemQuantity = id => {
    const updatedCart = cart.map(eachItem =>
      eachItem.id === id
        ? { ...eachItem, quantity: eachItem.quantity + 1 }
        : eachItem,
    )
    setCart(updatedCart)
  }

  const decrementCartItemQuantity = id => {
    const updatedCart = cart.map(eachItem =>
      eachItem.id === id
        ? { ...eachItem, quantity: eachItem.quantity - 1 }
        : eachItem,
    )
    setCart(updatedCart)
  }

  const removeAllCartItems = () => { }

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          addCartItem,
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeAllCartItems,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  )
}

const useCart = () => useContext(CartContext)

export { CartContextProvider, useCart }

export default CartContext
