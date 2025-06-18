'use client'

import { useCart } from '@/context/cartContext'

export default function ProductCart() {
  const { cartItems, removeFromCart } = useCart()

  return (
    <div className='w-full mx-auto px-8 py-8'>
      <h2 className='text-3xl font-bold mb-6 text-center'>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className='text-center text-gray-500'>Your cart is empty.</p>
      ) : (
        <div className='space-y-4'>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='md:flex md:items-center md:justify-between bg-white shadow-md p-4 rounded-lg border-1 rounded'
            >
              <div>
                <h3 className='text-lg font-semibold'>{item.name}</h3>
                <p className='text-sm text-gray-600'>
                  Quantity: {item.quantity}
                </p>
                <p className='text-sm text-gray-600'>Price: ${item.price}</p>
              </div>
              <div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='mt-2 text-sm text-red-500 hover:underline'
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
