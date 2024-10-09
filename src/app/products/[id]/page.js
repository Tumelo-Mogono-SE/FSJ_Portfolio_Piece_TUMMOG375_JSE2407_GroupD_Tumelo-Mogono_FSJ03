import ProductDetail from "@/components/ProductDetails";
import ProductDetailSkeleton from "@/components/LoaderSkeletons/ProductDetailSkeleton";
import Error from "@/components/Error";
import { fetchSingleProduct } from "@/api";
import GoBackButton from "@/components/GoBackButton";

/**
 * Generates metadata for the product detail page based on the product ID.
 * Fetches the product details and returns the metadata for SEO and social sharing.
 *
 * @param {Object} params - The parameters from the URL.
 * 
 * @returns {Object} Metadata object containing title, description, and Open Graph data.
 */
export async function generateMetadata({ params }) {
    const { id } = params;
    const product = await fetchSingleProduct(id);
    return {
        title: `${product.title} | Swift Cart`,
        description: product.description,
        openGraph: {
        title: `${product.title} | Swift Cart`,
        description: product.description,
        // images: [
        //     { url: product.images[0], width: 800, height: 600, alt: `${product.title} | Swift Cart` },
        // ],
        },
    };
}

/**
 * Renders the Product Detail page.
 * Fetches product details based on the product ID from the URL and displays them.
 * Includes a "Go back" button to return to the previous page.
 *
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} The product detail page with loading and error handling.
 */
export default async function ProductPage({ params }) {
    // Extracts the product ID from the URL parameters
    const { id } = params;
    let product;
    let loading = true;
    let error = null;

    try {
        product = await fetchSingleProduct(id);
        if (!product) {
            // Redirect if product is not found (handled at the routing level)
            throw new Error('Failed to fetch products')
        }
    } catch (err) {
        error = "Failed to load product details.";
    } finally {
        loading = false;
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
        throw error
    }

    // Display product details once the product data is loaded
    return (
        <div>
            <GoBackButton />
            <ProductDetail {...product} />
        </div>
    );
}