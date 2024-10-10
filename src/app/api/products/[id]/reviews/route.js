import { getFirestore, doc, getDoc, updateDoc, arrayUnion,arrayRemove } from "firebase/firestore";
import { app } from "@/firebaseConfig";

const db = getFirestore(app);

/**
 * API route to handle adding a review to a product.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 */
export async function POST(req, { params }) {
  const { id } = params; // Get product ID from URL params
  const newReview = await req.json(); // Parse the incoming request body

const paddedId = id.toString().padStart(3,"0");

    try {
    // Reference to the specific product document in Firestore
        const productRef = doc(db, "products", paddedId);

        // Update the product by appending the new review to the reviews array
        await updateDoc(productRef, {
            reviews: arrayUnion(newReview),
        });

        return new Response(JSON.stringify({ message: "Review added successfully!" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to add review", details: error.message }),
            { status: 500 }
        );
    }
}

/**
 * API route to handle editing an existing review for a product.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 */
export async function PUT(req, { params }) {
    const { id } = params; // Get product ID from URL params
    const { reviewId, comment, rating, date } = await req.json(); // Parse the incoming request body

    console.log('put',reviewId)

    const paddedId = id.toString().padStart(3, "0");

    try {
        // Reference to the specific product document in Firestore
        const productRef = doc(db, "products", paddedId);
    
        // Fetch the product to get its current reviews
        const productSnapshot = await getDoc(productRef);
        const productData = productSnapshot.data();
        const reviews = productData.reviews || [];

        // Find the review to update by its ID
        const updatedReviews = reviews.map((review) =>
            review.id === reviewId ? { ...review, comment, rating, date } : review
        );

        // Update the product's reviews array
        await updateDoc(productRef, {
            reviews: updatedReviews,
        });

        return new Response(JSON.stringify({ message: "Review updated successfully!" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to update review", details: error.message }),
            { status: 500 }
        );
    }
}

/**
 * API route to handle deleting a review for a product.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 */
export async function DELETE(req, { params }) {
    const { id } = params; // Get product ID from URL params
    const { reviewId } = await req.json(); // Parse the incoming request body

    console.log(reviewId)
    const paddedId = id.toString().padStart(3, "0");

    console.log('paddied', paddedId)
    try {
      // Reference to the specific product document in Firestore
        const productRef = doc(db, "products", paddedId);

      // Fetch the product to get its current reviews
        const productSnapshot = await getDoc(productRef);
        const productData = productSnapshot.data();
        console.log('data', productData)
        const reviews = productData.reviews || [];
        console.log(reviews)

      // Ensure reviewId is within valid bounds
        if (reviewId < 0 || reviewId >= reviews.length) {
            return new Response(JSON.stringify({ error: "Review not found" }), {
                status: 400,
            });
        }

        // Find the review to remove by its index (reviewId)
        const reviewToRemove = reviews[reviewId];

      // Remove the review from the product's reviews array
        await updateDoc(productRef, {
            reviews: arrayRemove(reviewToRemove),
        });

        return new Response(JSON.stringify({ message: "Review deleted successfully!" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to delete review", details: error.message }),
            { status: 500 }
        );
    }
}
