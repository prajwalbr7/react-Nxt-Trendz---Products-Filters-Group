import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStates = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    apiStatus: apiStates.initial,
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    CategoryId: '',
    RatingShow: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStates.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, CategoryId, RatingShow, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${CategoryId}&title_search=${searchInput}&rating=${RatingShow}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStates.success,
      })
    } else {
      this.setState({apiStatus: apiStates.failure})
    }
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  SearchSortby = searchInput => {
    this.setState({searchInput})
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList} = this.state
    const NoProductsView = productsList.length > 0
    // TODO: Add No Products View
    return NoProductsView ? (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="all-products-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
          className=""
        />
        <h1 className="no-products-view-heading">No Products Found</h1>
        <p className="no-products-view-para">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  SetCategoryId = categoryId => {
    console.log(categoryId)
    this.setState({CategoryId: categoryId}, this.getProducts)
  }

  SetRatingId = ratingId => {
    console.log(ratingId)
    this.setState({RatingShow: ratingId}, this.getProducts)
  }

  renderClearFilters = () => {
    this.setState(
      {
        RatingShow: '',
        CategoryId: '',
        searchInput: '',
      },
      this.getProducts,
    )
  }

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="FailureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failureImagePage"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We are some trouble processing your request. Please try again
      </p>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStates.success:
        return this.renderProductsList()
      case apiStates.failure:
        return this.renderFailureView()
      case apiStates.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {
      activeOptionId,
      CategoryId,

      searchInput,
    } = this.state

    return (
      <div className="all-products-section">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          searchInput={searchInput}
          SearchSortby={this.SearchSortby}
          enterSearchInput={this.enterSearchInput}
        />

        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          SetCategoryId={this.SetCategoryId}
          isCategoryActive={CategoryId}
          SetRatingId={this.SetRatingId}
          renderClearFilters={this.renderClearFilters}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
