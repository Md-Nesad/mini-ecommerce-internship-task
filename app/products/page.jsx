'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Pagination from '@/component/Pagination'

const LIMIT = 9

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `https://nanis-backend-live.sandbox.payinpos.com/api/v1/inventory/web/item/?limit=${LIMIT}&offset=${offset}`
      )
      const data = await res.json()
      setProducts(data?.data?.results || [])
    } catch (error) {
      console.log('Error fatching products' + error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [offset])

  return (
    <div className='p-8 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-center text-gray-800'>
        Product List
      </h1>

      {loading ? (
        <div className='text-center text-gray-500'>Loading...</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='border rounded-lg shadow hover:shadow-md transition duration-300'
            >
              <Link href={`/products/${product.slug}`}>
                <div className='p-4 cursor-pointer'>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className='w-full h-48 object-cover rounded hover:scale-105 transition-transform duration-300'
                  />
                  <h2 className='mt-4 text-lg font-semibold text-gray-800'>
                    {product.name}
                  </h2>
                  <p className='text-sm text-gray-600 mt-1'>
                    Price: ${product.price}
                  </p>

                  <p className='text-sm text-gray-600 mt-1 underline'>
                    See details
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className='mt-10 flex justify-center'>
        <Pagination offset={offset} setOffset={setOffset} LIMIT={LIMIT} />
      </div>
    </div>
  )
}
