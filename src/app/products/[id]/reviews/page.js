"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { firebaseDataManager } from "@/app/utils/firebaseDatabaseManage";
 // Import your manager

export default function ReviewsPage() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams(); // Get dynamic route parameters
  const searchParams = useSearchParams(); // To access query parameters
  const { id } = params; // Extract product ID
  const index = searchParams.get("index"); // Extract review index from query params

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews);
      } else {
        console.error("Failed to fetch reviews");
      }
    };
    if (id) {
      fetchReviews();
    }
  }, [id]);

  useEffect(() => {
    if (index !== null && reviews.length > 0) {
      const review = reviews[parseInt(index)];
      if (review) {
        setComment(review.comment);
        setRating(review.rating);
      }
    }
  }, [reviews, index]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = user.email.split('@')[0];
    const reviewData = {
      comment,
      rating,
      date: new Date().toISOString(),
      reviewerEmail: user.email,
      reviewerName: displayName || "Anonymous",
    };

    if (index !== null) {
      reviewData.reviewId = parseInt(index);
    }

    const method = index !== null ? "PUT" : "POST";

    if (navigator.onLine) {
      // Online, proceed with regular API request
      try {
        const res = await fetch(`/api/products/${id}/reviews`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        });

        if (res.ok) {
          alert(`Review ${index !== null ? "updated" : "submitted"} successfully!`);
          router.push(`/products/${id}`);
          router.refresh();
        } else {
          console.error("Failed to submit review");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      // Offline, queue the change
      firebaseDataManager.queueChange({
        path: `/products/${id}/reviews`,
        data: reviewData,
      });
      alert("You are offline. Your review has been saved and will be submitted once you're back online.");
    }
  };

  const handleDelete = async () => {
    if (index === null) return;
    const confirmation = confirm("Are you sure you want to delete this review?");

    if (confirmation) {
      try {
        const res = await fetch(`/api/products/${id}/reviews`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewId: parseInt(index) }),
        });

        if (res.ok) {
          alert("Review deleted successfully!");
          router.push(`/products/${id}`);
          router.refresh();
        } else {
          console.error("Failed to delete review");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  useEffect(() => {
    // Sync pending changes when the user comes back online
    const handleOnline = () => {
      firebaseDataManager.syncPendingChanges(); // Pass your Firebase DB instance if necessary
    };
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div className="container mx-auto my-6 p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {index !== null ? "Edit Review" : "Write a Review"}
      </h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded text-black shadow-lg">
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
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
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {index !== null ? "Update Review" : "Submit Review"}
        </button>
        {index !== null && (
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