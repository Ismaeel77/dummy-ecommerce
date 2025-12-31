import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { getByCategory } from '../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ScaleLoader } from 'react-spinners';
import { addToCart } from '../../features/cart/cartSlice';
import toast from 'react-hot-toast';

function CategoryProducts() {
  const {categoryName} = useParams()
  const dispatch = useDispatch()
  const {products, isLoading} = useSelector((state) => state.products)

  function handleAddToCart(product) {
    dispatch(addToCart(product))
    toast.success("Product Added To Cart Successfully", {
      duration:3000,
      position:'bottom-center'
    })
  }

  useEffect(() => {
    dispatch(getByCategory(categoryName))
  },[dispatch,categoryName])



  if (products.length === 0 ) return <h1>No Products Found</h1>

  return (
    <section className="p-16">
      <ScaleLoader
        className="text-center"
        color="#0092b8"
        loading={isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <Link to={'/categories'} className={`flex items-center w-fit mb-5 rounded-lg border cursor-pointer px-4 py-2`}>Go Back To All Categories</Link>
      <h1 className="text-4xl mb-8 capitalize text-gray-700">
        <span className='text-gray-900'>Category: </span>{categoryName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart}/>
        ))}
      </div>
    </section>
  );
}

export default CategoryProducts