import React from 'react'
import { Link } from 'react-router'
const Logo = () => {
  return (
    <Link
    to={"/"}  // Use Link here for navigation
   className="flex items-center"
  >
        
          <span className="text-4xl font-bold bg-gradient-to-r from-pink-700 to-orange-500 text-transparent bg-clip-text">
            Upick
          </span>
        </Link>
  )
}

export default Logo