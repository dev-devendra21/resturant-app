import './index.css'
import DishItem from '../DishItem'

const Dishes = ({ categoryDishes }) => (
  <>
    <ul className="dishes-container">
      {categoryDishes?.map(eachDish => (
        <DishItem key={eachDish.dishId} {...eachDish} />
      ))}
    </ul>
  </>
)

export default Dishes
