import { Link } from "react-router";

function ProductCard({product,onAddToCart}) {
  return (
    <div className="flex flex-col justify-between p-4 border border-gray-200 h-full">
      <Link to={`/productdetails/${product.id}`}>
          <div className="w-full p-2 border-b border-gray-200">
            <img className="max-w-full object-center object-cover" src={product.thumbnail} alt={product.title}/>
          </div>
          <h2 className="font-medium py-2">{product.title}</h2>
          <p className="text-sm text-gray-400">Category: {product.category}</p>
          <p className="text-sm text-gray-400">Brand: {product.brand}</p>
          <div className="flex items-center justify-between py-2">
            <p className="text-sm">Price: ${product.price}</p>
            <p className="text-sm">Ratings: <i className="fa-solid fa-star text-yellow-500"></i>{product.rating}</p>
          </div>
      </Link>
      <button className="text-white block w-full cursor-pointer transition duration-300 ease-in-out bg-linear-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
      type="button"
      onClick={() => onAddToCart(product)}
      >
        <i className="fa-solid fa-cart-shopping text-white me-2"></i>
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;
