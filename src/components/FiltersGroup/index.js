import './index.css'

const FiltersGroup = props => {
  const {renderClearFilters} = props
  const renderCategoryList = () => {
    const {categoryOptions} = props
    return categoryOptions.map(eachItem => {
      const {SetCategoryId, isCategoryActive} = props
      const FetchItemById = () => SetCategoryId(eachItem.categoryId)
      const ColorChange =
        isCategoryActive === eachItem.categoryId ? 'categoryTrue' : ''
      return (
        <li className="" key={eachItem.categoryId} onClick={FetchItemById}>
          <p className={`button-style-filter ${ColorChange}`}>
            {eachItem.name}
          </p>
        </li>
      )
    })
  }

  const renderRatingList = () => {
    const {ratingsList} = props
    return ratingsList.map(eachItem => {
      const {SetRatingId} = props
      const RatingFilterItem = () => SetRatingId(eachItem.ratingId)
      return (
        <li
          className="button-img-filter"
          key={eachItem.ratingId}
          onClick={RatingFilterItem}
        >
          <img
            src={eachItem.imageUrl}
            alt={`rating ${eachItem.ratingId}`}
            className="imgsizing-filter"
          />{' '}
          & up
        </li>
      )
    })
  }

  return (
    <div className="filters-group-container">
      <h1 className="heading-filter">Category</h1>
      <div className="ul-style-category">{renderCategoryList()}</div>
      <h1 className="heading-filter">Rating</h1>
      <div className="ul-style-category">{renderRatingList()}</div>
      <button
        type="button"
        className="clear-filter-button-style"
        onClick={renderClearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
