import { useDispatch, useSelector } from "react-redux";
import {
  getByCategory,
  getCategories,
  setSelectedCategory,
} from "../../features/products/productsSlice";
import { useEffect } from "react";
import { Link } from "react-router";

function Categories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleSetCategory(cat) {
    dispatch(setSelectedCategory(cat));
    dispatch(getByCategory(cat));
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 2xl:px-0">
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Shop by category
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories?.map((category) => (
            <Link
              to={`/categories/${category.slug}`}
              key={category.slug}
              onClick={() => handleSetCategory(category)}
              className={`flex items-center rounded-lg border cursor-pointer px-4 py-2`}
            >
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
