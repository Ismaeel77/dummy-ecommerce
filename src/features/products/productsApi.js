// Get All Products
export const fetchProducts = async () => {
  const res = await fetch(`https://dummyjson.com/products`);
  return res.json();
};

// Get Single Product
export const fetchSingleProduct = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
};

// get all categories
export const fetchCategories = async () => {
  const res = await fetch("https://dummyjson.com/products/categories");
  return res.json();
};

// get products by category
export const fetchByCategory = async (category) => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  return res.json();
};