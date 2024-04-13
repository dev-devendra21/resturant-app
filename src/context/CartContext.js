import { createContext, useContext, useState } from 'react'

const CartContext = createContext({
  cart: [],
})

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          setCart,
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
