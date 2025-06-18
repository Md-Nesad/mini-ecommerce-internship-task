import Link from 'next/link'

export default function HomePage() {
  return (
    <main className='min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10 text-center'>
      <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-6'>
        Welcome to Devsstream LTD Frontend Intern Task
      </h1>

      <p className='text-lg text-gray-600 max-w-xl mb-10'>
        This is a simple E-commerce product listing and detail page using the
        provided API.
      </p>

      <div className='flex gap-4 flex-wrap justify-center'>
        <Link
          href='/products'
          className='px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition'
        >
          Browse Products
        </Link>
        <Link
          href='/cart'
          className='px-6 py-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900 transition'
        >
          View Cart
        </Link>
      </div>
    </main>
  )
}
