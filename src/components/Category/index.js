import './index.css'

const Category = ({ categoryData, onChangeCategory, onSelectedId }) => (
  <>
    <ul className="category-list-container">
      {categoryData.map(eachData => {
        const { menuCategoryId, menuCategory } = eachData
        return (
          <li key={menuCategoryId}>
            <button
              className={
                menuCategoryId === onSelectedId
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

export default Category
