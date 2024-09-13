"use client";

import Link from "next/link";

export function ProductCard({ id, title, images, price, rating, category }) {


  return (
    <Link href={`/products/${id}`}>
      <div className="max-w-xs w-80 bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
        {/* Image Container */}
        <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
            <img src={images[0]} alt={title} className="object-contain h-full w-full" />
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Product Title */}
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
           {/*category*/}
          <span className=" mt-1 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
            {category}
          </span>

          {/* Ratings div */}
          <div className="mb-3 mt-2 flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-3 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
              {rating}
            </span>
          </div>

          {/* Prices and Add to Cart Button div*/}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              R{price}
            </span>
            <button
              className="rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}