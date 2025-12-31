import { useSelector, useDispatch} from 'react-redux'
import { clearCart, removeFromCart } from '../../features/cart/cartSlice';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

function Cart() {
  const dispatch = useDispatch()
  const {items, totalQty, totalPrice} = useSelector((state)=>state.cart);


  function handleRemoveFromCart(productId) {
    dispatch(removeFromCart(productId))
    toast.error('Product Deleted',{
      duration:3000,
      position:'bottom-center'
    })
  }


  if (items?.length === 0) return <h1 className="p-8 text-7xl text-center py-16">Your cart is empty</h1>;

  return (
    <section className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>

      <div className="grid gap-4">
        {items?.map(item => (
          <div key={item?.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center gap-4">
              <img src={item?.images[0]} alt={item?.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{item?.title}</h2>
                <p>${item?.price}</p>
                <p>Qty: {item?.quantity}</p>
              </div>
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => handleRemoveFromCart(item?.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total ({totalQty} items): ${totalPrice.toFixed(2)}</p>
        <div className="flex gap-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
          <Link to={'/'} className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 cursor-pointer">
            Go Back To Shpping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart