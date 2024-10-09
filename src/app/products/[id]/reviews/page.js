"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter, useParams } from "next/navigation";

/**
 * Reviews Page Component
 * 
 * Renders a form for the user to submit a review for a specific product.
 */
export default function ReviewsPage() {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams(); // Get dynamic route parameters
    const { id } = params; // Extract product ID

    // Check if the user is authenticated
    if (!user) {
        // Optionally, you can redirect to login page or show a message
        router.push("/login");
        return null;
    }

    // Submit review handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct review object
        const newReview = {
            comment,
            rating,
            date: new Date().toISOString(),
            reviewerEmail: user.email,
            reviewerName: user.displayName || "Anonymous",
        };

        // Send the review to the server to be added to the product's reviews array
        try {
            const res = await fetch(`/api/products/${id}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReview),
            });

            if (res.ok) {
                alert("Review submitted successfully!"); 
                router.push(`/products/${id}`); // Redirect back to product page
            } else {
                console.error("Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="container mx-auto my-6 p-4">
            <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
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
                    Submit Review
                </button>
            </form>
        </div>
    );
}