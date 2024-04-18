import { createContext, useContext, useState, useEffect } from 'react'
import { Oval } from "react-loader-spinner"

const ApiStatusConstant = {
  INPROCESS: 'INPROCESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

const CartContext = createContext({
  cart: [],
  restaurantData: {},
  selectedId: "",
  addCartItem: () => { },
  removeCartItem: () => { },
  incrementCartItemQuantity: () => { },
  decrementCartItemQuantity: () => { },
  removeAllCartItems: () => { },
})




const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [restaurantData, setRestaurantData] = useState({
    status: ApiStatusConstant.INPROCESS,
    data: {},
    error: null,
  })
  const [selectedId, setSelectedId] = useState("")


  useEffect(() => {
    const getRestaurantData = async () => {
      const response = await fetch("https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc")
      const responseData = await response.json()
      if (response.ok) {
        setRestaurantData({
          status: ApiStatusConstant.SUCCESS,
          data: responseData[0],
          error: null,
        })
        setSelectedId(responseData[0].table_menu_list[0].menu_category_id)
      } else {
        setRestaurantData({
          status: ApiStatusConstant.FAILURE,
          data: [],
          error: "Something went wrong",
        })
      }

    }
    getRestaurantData()

  }, [])

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

  if (restaurantData.status === ApiStatusConstant.INPROCESS) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        {
          <Oval
            height="80"
            width="80"
            color="#4fab0d"
          />
        }
      </div>
    )
  }

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          restaurantData,
          selectedId,
          setSelectedId,
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
