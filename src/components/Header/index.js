import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'
import {useCart} from '../../context/CartContext'

const Header = () => {
  const {cart} = useCart()
  return (
    <>
      <nav className="nav-bar">
        <h1 className="resturant-name">UNI Resto Cafe</h1>
        <div className="cart-container">
          <p className="my-orders">My Orders</p>
          <p className="cart-icon-container">
            <span className="cart-count">{cart.length}</span>
            <AiOutlineShoppingCart className="cart-icon" />
          </p>
        </div>
      </nav>
      <hr className="horizontal-line" />
    </>
  )
}

export default Header
