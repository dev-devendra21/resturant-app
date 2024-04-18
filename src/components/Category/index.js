import './index.css'
import { useCart } from '../../context/CartContext'

const Category = ({ categoryData }) => {
  const { selectedId, setSelectedId } = useCart()
  const onChangeCategory = (id) => { setSelectedId(id) }
  return (
    <>
      <ul className="category-list-container">
        {categoryData?.map(eachData => {
          const { menuCategoryId, menuCategory } = eachData
          return (
            <li key={menuCategoryId}>
              <button
                className={
                  menuCategoryId === selectedId
                    ? 'active-button button'
                    : 'button'
                }
                onClick={() => onChangeCategory(menuCategoryId)}
                type="button"
              >
                {menuCategory}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Category
