import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import ProductDetails from './pages/ProductsDetails/ProductDetails'
import Categories from './pages/Categories/Categories'
import CategoryProducts from './pages/CategoryProducts/CategoryProducts'
import Cart from './pages/Cart/Cart'
import NotFound from './components/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'

function App() {

  let routes = createBrowserRouter([
    {
      path:'/', element:<Layout />,children : [
        {index:true, element:<Home />},
        {path:'/productdetails/:id', element:<ProductDetails />},
        {path:'/categories', element:<Categories />},
        {path:'/categories/:categoryName', element:<CategoryProducts />},
        {path:'/cart', element:<Cart />},
        {path:'*', element:<NotFound />},
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </>
)
}

export default App
