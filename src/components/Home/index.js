
import Category from '../Category'
import Dishes from '../Dishes'
import './index.css'
import { useCart } from '../../context/CartContext'

const formatData = data => {
  const category = data.map(eachData => ({
    menuCategory: eachData.menu_category,
    menuCategoryId: eachData.menu_category_id,
    categoryDishes: eachData.category_dishes.map(eachDish => ({
      addonCat: eachDish.addonCat,
      dishAvailability: eachDish.dish_Availability,
      dishType: eachDish.dish_Type,
      dishCalories: eachDish.dish_calories,
      dishCurrency: eachDish.dish_currency,
      dishDescription: eachDish.dish_description,
      dishId: eachDish.dish_id,
      dishImage: eachDish.dish_image,
      dishName: eachDish.dish_name,
      dishPrice: eachDish.dish_price,
      dishQuantity: 0,
    })),
  }))

  return category
}



const Home = () => {
  const { restaurantData, selectedId } = useCart()
  let data = []
  let index = 0

  if (restaurantData.status === "SUCCESS") {
    data = formatData(restaurantData.data.table_menu_list)
    index = data.findIndex(eachData => eachData.menuCategoryId === selectedId)

  }
  return (
    <>
      <Category categoryData={data} />
      <Dishes categoryDishes={data[index]?.categoryDishes} />
    </>
  )
}

export default Home
