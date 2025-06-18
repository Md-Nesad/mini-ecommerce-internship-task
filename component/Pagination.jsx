import React from 'react'

export default function Pagination({ offset, setOffset, LIMIT }) {
  return (
    <>
      <div className='flex justify-between mt-8 gap-4 '>
        <button
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:scale-105 transition-transform duration-300'
          onClick={() => setOffset((prev) => Math.max(0, prev - LIMIT))} //Bigger then 0
          disabled={offset === 0}
        >
          Previous
        </button>

        <button
          className='px-4 py-2 bg-blue-600 text-white rounded hover:scale-105 transition-transform duration-300'
          onClick={() => setOffset((prev) => prev + LIMIT)}
        >
          Next
        </button>
      </div>
    </>
  )
}
