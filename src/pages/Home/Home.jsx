import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productsSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { addToCart } from "../../features/cart/cartSlice";

function Home() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");

  function handleAddToCart(product) {
    dispatch(addToCart(product))
    toast.success("Product Added To Cart Successfully", {
      duration:3000,
      position:'bottom-center'
    })
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="w-full p-16">
      <h1 className="text-5xl py-10 font-medium">All Products</h1>
      <input
        value={search}
        name="search"
        id="search"
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        placeholder="Search...."
        className="py-2 px-4 focus:outline-0 my-8 w-full border border-cyan-600 rounded-md"
      />

      <ScaleLoader
      className="text-center"
        color="#0092b8"
        loading={isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {/* Display All Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products
          .filter((product) => {
            const query = search.toLowerCase().trim()
            return query === ""
              ? product
              : product.title.toLowerCase().includes(query) ||
                  product.brand?.toLowerCase().includes(query) ||
                  product.category?.toLowerCase().includes(query);
          })
          .map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart}/>
          ))}
      </div>
    </section>
  );
}

export default Home;
