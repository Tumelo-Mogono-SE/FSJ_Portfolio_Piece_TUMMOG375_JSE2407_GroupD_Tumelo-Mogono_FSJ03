"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter, useParams } from "next/navigation";

/**
 * Reviews Page Component
 * 
 * Renders a form for the user to submit or edit a review for a specific product.
 */
export default function ReviewsPage() {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams(); // Get dynamic route parameters
    const { id } = params; // Extract product ID
    const index = router.query; // Extract review index

    // Check if the user is authenticated
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    // Fetch existing reviews data and determine the review to edit
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await fetch(`/api/products/${id}/reviews`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data); // Assuming data is an array of reviews
            } else {
                console.error("Failed to fetch reviews");
            }
        };
        if (id) {
            fetchReviews();
        }
    }, [id]);

    // Populate the form with the existing review data if editing
    useEffect(() => {
        if (index !== undefined && reviews.length > 0) {
            const review = reviews[parseInt(index)]; // Convert index to integer
            if (review) {
                setComment(review.comment);
                setRating(review.rating);
            }
        }
    }, [reviews, index]);

    // Submit review handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            comment,
            rating,
            date: new Date().toISOString(),
            reviewerEmail: user.email,
            reviewerName: user.displayName || "Anonymous",
        };

        const method = index !== undefined ? "PUT" : "POST"; // Determine method based on editing or creating

        // Send the review to the server
        try {
            const res = await fetch(`/api/products/${id}/reviews${index !== undefined ? `/${index}` : ''}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (res.ok) {
                alert(`Review ${index !== undefined ? "updated" : "submitted"} successfully!`);
                router.push(`/products/${id}`); // Redirect back to product page
            } else {
                console.error("Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    // Delete review handler
    const handleDelete = async () => {
        if (index === undefined) return; // Exit if there's no review to delete

        const confirmation = confirm("Are you sure you want to delete this review?");
        if (confirmation) {
            try {
                const res = await fetch(`/api/products/${id}/reviews/${index}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    alert("Review deleted successfully!");
                    router.push(`/products/${id}`); // Redirect back to product page
                } else {
                    console.error("Failed to delete review");
                }
            } catch (error) {
                console.error("Error deleting review:", error);
            }
        }
    };

    return (
        <div className="container mx-auto my-6 p-4">
            <h2 className="text-2xl font-semibold mb-4">
                {index !== undefined ? "Edit Review" : "Write a Review"}
            </h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded text-black shadow-lg">
                {/* Comment Field */}
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />

                {/* Rating Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rating:</label>
                    <select
                        className="mt-1 block w-full p-2 text-black border rounded"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? "Star" : "Stars"}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {index !== undefined ? "Update Review" : "Submit Review"}
                </button>

                {/* Delete Button */}
                {index !== undefined && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="ml-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Delete Review
                    </button>
                )}
            </form>
        </div>
    );
}