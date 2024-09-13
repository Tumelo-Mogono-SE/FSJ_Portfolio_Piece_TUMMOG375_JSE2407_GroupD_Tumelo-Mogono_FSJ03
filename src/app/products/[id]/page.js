'use client';
import ProductDetail from "@/components/ProductDetails";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchSingleProduct } from "@/api/api";
import ProductDetailSkeleton from "@/components/LoaderSkeletons/ProductDetailSkeleton";


/**
 * Renders the Product Detail page.
 * Fetches product details based on the product ID from the URL and displays them.
 * Includes a "Go back" button to return to the previous page.
 *
 * @returns {JSX.Element} The product detail page with loading and error handling.
 */
export default function ProductPage() {
    // State to store the product data
    const [product, setProduct] = useState(null);  
    // State to track loading status
    const [loading, setLoading] = useState(true);
    // State to track errors
    const [error, setError] = useState(null);

    // Extracts the product ID from the URL parameters
    const { id } = useParams();
    const router = useRouter();

    /**
   * Fetches a single product by ID and sets the product state.
   * Also handles loading and error states.
   *
   * @async
   * @function getSingleProduct
   * @param {string} id - The ID of the product to fetch.
   * @returns {Promise<void>}
   */   
    useEffect(() => {
        async function getSingleProduct(id) {
            try {
            setLoading(true);
            const productData = await fetchSingleProduct(id);
            setProduct(productData); 
            setError(null); 
            } catch (err) {
            setError("Failed to load product details."); 
            } finally {
            setLoading(false); 
            }
        }
        
        // Only fetch if ID is available
        if (id) {
            getSingleProduct(id);
        }
    }, [id]);


    /**
   * Handles the "Go back" button click by returning to the previous page.
   */
    const handleBackButton = () => {
        router.back();
    }


    // Display loading state using the skeleton loader
    if (loading) {
        return (
            <div className="flex items-center justify-center p-2 mt-8">
                <ProductDetailSkeleton />
            </div>
        );
    }

    // Display error message if an error occurred
    if (error) {
        return (
            <div className="flex items-center justify-center p-2 mt-8 text-red-600">
                {error}
            </div>
        );
    }

    // Display product details once the product data is loaded
    return (
        <div>
            <button onClick={handleBackButton} className="mt-4 mx-4 px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-500">&larr; Go back</button>
            <ProductDetail {...product} />
        </div>
    );
}