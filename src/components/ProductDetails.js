"use client";
import Gallery from "./Gallery";
import { useState } from "react";
import SortReviews from "./SortReviews";
import { useRouter } from "next/navigation";

/**
 * ProductDetail Component
 * 
 * Displays detailed information about a product, including images, title, price, category, rating, description, tags, and customer reviews.
 * 
 * @component
 * @param {Object} product - The product object containing all the product details.
 */
export default function ProductDetail(product) {
    const router = useRouter();
    const { title, description, category, price, rating, images, tags, reviews } = product;

    const [sortedReviews, setSortedReviews] = useState([...reviews]);

    /**
     * Sort reviews based on the selected sort option.
     * 
     * @param {string} sortOption - The option by which reviews should be sorted.
     */
    function handleSortChange(sortOption){
        let sorted;
        switch (sortOption) {
            case "date":
                sorted = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case "date-asc":
                sorted = [...reviews].sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case "rating":
                sorted = [...reviews].sort((a, b) => b.rating - a.rating);
                break;
            case "rating-asc":
                sorted = [...reviews].sort((a, b) => a.rating - b.rating);
                break;
            default:
                sorted = [...reviews];
                break;
        }
        setSortedReviews(sorted);
    }

    return (
        <div className="container mx-auto my-6 p-4">
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row shadow-lg rounded-lg bg-slate-200">
                {/* Left Section: Product Image */}
                <div className="flex justify-center w-full lg:w-1/2 mb-6 lg:mb-0">
                    <Gallery images={images} />
                </div>

                {/* Right Section: Product Information */}
                <div className="lg:w-1/2 lg:pl-8 mt-10">
                    {/* Product Title */}
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">{title}</h1>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                    <div className="mx-2 flex items-center">
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
                        <span className="text-sm text-gray-600">(based on {reviews.length} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="text-2xl font-semibold text-gray-900 mb-4">R{price}</div>

                    {/* Category */}
                    <p className="text-sm text-gray-500 mb-2">
                        Category: 
                        <span
                            className="ml-2 inline-block rounded-full bg-slate-300 px-3 py-1 text-sm text-gray-700"
                        >
                            {category}
                        </span>
                    </p>

                    {/* Description */}
                    <p className="text-base text-gray-700 mb-6">{description}</p>

                    {/* Tags */}
                    <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-800">Tags:</span>
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="ml-2 inline-block rounded-full bg-slate-300 px-3 py-1 text-sm text-gray-700"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>

                {/* Add to Cart Button */}
                    <div className="flex items-center">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">
                            Add to Cart
                        </button>
                        <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10 shadow-lg rounded-lg bg-slate-200 p-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>

                 {/* Sorting Component */}
                <SortReviews onSortChange={handleSortChange} />

                <button
                    onClick={() => router.push(`/products/${id}/reviews`)}
                    className="ml-4 mx-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Add a Review
                </button>

                <div className="space-y-4">
                    {sortedReviews.map((review, index) => (
                        <div key={index} className="border-t p-4 bg-slate-300 rounded-lg">
                            <div className="my-2 flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <svg
                                    key={i}
                                    className={`h-5 w-5 ${
                                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-3 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                    {review.rating}
                                </span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500">{review.rating} ★</span>
                                <span className="ml-2 text-gray-600">by {review.reviewerName}</span>
                                <span className="ml-2 text-gray-600">by {new Date(review.date).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            {user && (
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        onClick={() => router.push(`/products/${id}/reviews?${index}`)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => router.push(`/products/${id}/reviews?${index}`)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}