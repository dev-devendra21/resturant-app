import { FiPlus, FiMinus } from 'react-icons/fi'
import './index.css'
import { useCart } from '../../context/CartContext'

const Button = props => {
  const { id, increaseQuantity, decreaseQuantity } = props
  const { cart } = useCart()

  const quantity = cart?.find(item => item.id === id)?.quantity

  return (
    <>
      <div className="button-container">
        <button
          onClick={decreaseQuantity}
          type="button"
          className="button-action"
        >
          <FiMinus />
        </button>
        <span>{quantity !== undefined ? quantity : 0}</span>
        <button
          onClick={increaseQuantity}
          type="button"
          className="button-action"
        >
          <FiPlus />
        </button>
      </div>
    </>
  )
}

export default Button
