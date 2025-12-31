import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { getSingleProduct } from "../../features/products/productsSlice";
import { ScaleLoader } from "react-spinners";
import { addToCart } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const { singleProduct, isLoading } = useSelector((state) => state.products)
  const dispatch = useDispatch();


  function handleAddToCart() {
    dispatch(() => addToCart(singleProduct.id))
    toast.success("Product Added To Cart Successfully", {
      duration:3000,
      position:'bottom-center'
    })
  }

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch,id]);
  


  return (
    <section className="py-8 bg-white md:py-16 ">
      <ScaleLoader
        className="text-center"
        color="#0092b8"
        loading={isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <section className="max-w-7xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="flex flex-col justify-center">
            <div className="w-fit flex items-center max-w-md lg:max-w-lg mx-auto border border-gray-300 shadow">
              <img className="object-center object-cover max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30" src={singleProduct?.thumbnail} alt={singleProduct?.title} />
            </div>
            {/* Image Carousel */}
            <div className="flex items-center justify-between max-w-50 py-4">
              {singleProduct?.images.length == 1 ? '' : singleProduct?.images.map((img,i) => (
                <img key={i} src={img} alt="Image Carousel" className="object-cover cursor-pointer mx-1.5 p-2 border border-gray-300"/>
              ))}
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1
              className="text-xl font-semibold text-gray-900 sm:text-2xl"
            >
              {singleProduct?.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p
                className="text-2xl font-extrabold text-gray-900 sm:text-3xl"
              >
                ${singleProduct?.price}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500">
                  {singleProduct?.rating}
                </p>
                <Link to={"/reviews"} className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline " >
                  {singleProduct?.reviews?.length}
                </Link>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button
                type="button"
                className="text-white cursor-pointer mt-4 sm:mt-0 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none  flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>

                Add to cart
              </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {singleProduct?.description}
            </p>

            <div>
              <p className="text-gray-900 font-medium text-lg">
                Brand: <span className="text-gray-500 dark:text-gray-400 text-sm">{singleProduct?.brand}</span>
              </p>
              <p className="text-gray-900 font-medium text-lg">
                Category: <span className="text-gray-500 dark:text-gray-400 text-sm">{singleProduct?.category}</span> 
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Reviews */}
      <section className="my-16 mx-16">
        <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
        {singleProduct?.reviews?.map((review,i) => (
          <section key={i} className="py-8">
            <div className="mx-auto max-w-7xl px-4 2xl:px-0">
              <div className="flex items-center gap-2">
              </div>

              <div className="mt-6 divide-y divide-gray-200">
                <div className="gap-3 sm:flex items-center">
                  <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                    <div className="flex items-center gap-0.5">
                      <p className="me-2">Rating : {review?.rating}</p>
                      <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>

                      <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>

                      <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>

                      <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>

                      <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>

                    </div>

                    <div className="space-y-0.5">
                      <p className="text-base font-semibold text-gray-900">{review?.reviewerName}</p>
                      <p className="text-sm font-normal text-gray-500">{review?.reviewerEmail}</p>
                    </div>

                    <div className="inline-flex items-center gap-1">
                      <svg className="h-5 w-5 text-primary-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-700">Verified purchase</p>
                    </div>
                  </div>

                  <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{review?.comment}</p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        ))}
      </section>
    </section>
  );
}

export default ProductDetails;
