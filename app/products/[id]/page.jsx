'use client'
import { useCart } from '@/context/cartContext'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function SingleProductDetails() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewCart, setViewCart] = useState(false)
  const { id } = useParams()
  const { addToCart } = useCart()

  const addProduct = () => {
    addToCart(product)
    alert('view cart to see your products')
    setViewCart(true)
  }

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://nanis-backend-live.sandbox.payinpos.com/api/v1/inventory/web/item/${id}`
      )
      const result = await res.json()
      setProduct(result.data)
    } catch (err) {
      console.error('Error fetching single product:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-500 text-lg'>Loading...</p>
      </div>
    )
  }

  return (
    <section className='w-full mx-auto p-8 h-full'>
      <button className='mt-6' title='back to products list page'>
        <Link className='items-center underline' href='/products'>
          <span>←</span> Go Back
        </Link>
      </button>

      <h2 className='text-3xl font-bold mb-6 text-center'>Product Details</h2>

      <div className='bg-white rounded-xl overflow-hidden md:flex md:items-center md:justify-between gap-6'>
        {/* Image */}
        <div className='md:w-1/2'>
          <img
            src={product.image_url}
            alt={product.name}
            className='h-96 w-full object-cover rounded'
          />
        </div>

        {/* Content */}
        <div className='p-6 md:w-1/2 space-y-4 pr-10'>
          <h3 className='text-2xl font-semibold text-gray-800'>
            {product.name}
          </h3>
          <p className='text-gray-600 text-lg'>
            {product.description
              .replace(/<\/?(p|span)([^>]*)?>/gi, '')
              .replace(/&amp;/g, '&') || 'No description'}
          </p>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h4 className='text-2xl font-semibold text-gray-800'>
                Ingredients:
              </h4>
              <ul className='list-disc list-inside text-gray-700 text-lg mt-1 space-y-1'>
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.name}</li>
                ))}
              </ul>
            </div>
          )}

          <p className='text-lg text-gray-800 font-medium'>
            Price: <span className='text-green-600'>${product.price}</span>
          </p>
          <p className='text-gray-700 text-lg'>
            Available Quantity: {product.quantity}
          </p>

          {/* Add to cart / View cart */}
          {viewCart ? (
            <div>
              <Link href='/cart' className='text-blue-600 underline'>
                View cart
              </Link>
            </div>
          ) : (
            <button
              onClick={addProduct}
              className='mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
