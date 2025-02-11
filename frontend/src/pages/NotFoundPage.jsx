import React from 'react'
import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className='flex flex-col gap-2 m-5'>404 Not Found
      <Link to="/" className='text-primary'>Go to Home</Link>
    </div>
  )
}

