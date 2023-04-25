import {BsFilterRight, BsSearch} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const onSearchSortby = event => {
    const {SearchSortby} = props
    SearchSortby(event.target.value)
  }
  const onSearchKeyEnter = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const {sortbyOptions, activeOptionId, searchInput} = props

  return (
    <div className="products-header">
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          className="input-product-header-style"
          value={searchInput}
          onChange={onSearchSortby}
          onKeyDown={onSearchKeyEnter}
        />
        <BsSearch className="search-icon-style" />
      </div>
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
