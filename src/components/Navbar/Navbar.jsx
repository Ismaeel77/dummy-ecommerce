import React from "react";
import Logo from '../../assets/logo.png'
import { useSelector } from "react-redux";
import { Link } from "react-router";

function Navbar() {
  const { totalQty } = useSelector((state) => state.cart)
  
  return (
    <nav className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link className="block" to={'/'}>
                <img src={Logo} width={50} height={50} alt="website logo"/>
              </Link>
            </div>
            <ul className="flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li>
                <Link to='/' className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  Home
                </Link>
              </li>
              <li className="shrink-0">
                <Link to={'/categories'} className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  Categories
                </Link>
              </li>
              <li className="shrink-0">
                <Link to={'/cart'} className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  Cart
                </Link>
              </li>
              <li className="shrink-0">
                <Link to="/cart" className="relative">
                  <i className="fa-solid fa-cart-shopping text-white"></i>
                  {totalQty > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalQty}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
