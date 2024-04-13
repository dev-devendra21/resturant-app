import { useState, useEffect } from 'react'
import Category from '../Category'
import Dishes from '../Dishes'
import './index.css'

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

const ApiStatusConstant = {
  INPROCESS: 'INPROCESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

const Home = () => {
  const [categoryList, setCategoryList] = useState({
    data: [],
    apiStatus: ApiStatusConstant.INPROCESS,
  })
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const resturantData = async () => {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
          { signal },
        )
        const responseData = await response.json()
        if (response.ok) {
          const category = formatData(responseData[0].table_menu_list)
          setCategoryList(prev => ({
            ...prev,
            apiStatus: ApiStatusConstant.SUCCESS,
            data: category,
          }))

          setSelectedCategoryId(category[0].menuCategoryId)
        } else {
          setCategoryList(prev => ({
            ...prev,
            apiStatus: ApiStatusConstant.FAILURE,
          }))
        }
      } catch (error) {
        console.log(error)
        setCategoryList(prev => ({
          ...prev,
          apiStatus: ApiStatusConstant.FAILURE,
        }))
      }
    }
    resturantData()
    return () => {
      controller.abort()
    }
  }, [])

  const handleCategoryId = id => {
    setSelectedCategoryId(id)
  }

  let selectedCategoryIndex = null

  if (categoryList.data.length > 0) {
    const categoryDishesIndex = () => {
      const index = categoryList.data.findIndex(
        eachCategory => eachCategory.menuCategoryId === selectedCategoryId,
      )

      return index
    }

    selectedCategoryIndex = categoryDishesIndex()
  }

  return (
    <>
      {categoryList.data.length > 0 && (
        <div className="home-container">
          <Category
            categoryData={categoryList.data}
            onChangeCategory={handleCategoryId}
            onSelectedId={selectedCategoryId}
          />
          <Dishes
            categoryDishes={
              categoryList.data[selectedCategoryIndex]?.categoryDishes
            }
          />
        </div>
      )}
    </>
  )
}

export default Home
