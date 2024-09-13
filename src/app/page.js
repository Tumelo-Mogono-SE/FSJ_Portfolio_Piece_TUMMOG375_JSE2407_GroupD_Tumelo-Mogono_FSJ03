import { fetchProducts } from "@/api/api";
import { ProductCard } from "@/components/ProductCard";
import PaginationComponent from "@/components/Pagination";
import CardSkeleton from "@/components/LoaderSkeletons/CardSkeleton";
import Error from "@/components/Error";

/**
 * A Home page that fetches and displays products along with pagination.
 * Handles both loading state (with skeletons) and error state.
 *
 * @param {Object} props.searchParams - Search parameters for URL query string.
 * @param {string} [props.searchParams.page] - The current page number for pagination, extracted from the URL.
 *
 * @returns {JSX.Element} The JSX to render the home page, including product cards and pagination.
 */
export default async function Home({ searchParams }) {
  /**
   * Number of products to display per page.
   * @type {number}
   */
  const productsPerPage = 20;

  /**
   * Current page number, defaulting to 1 if not present in `searchParams`.
   * @type {number}
   */
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  /**
   * Number of products to skip based on the current page.
   * @type {number}
   */
  const skip = (currentPage - 1) * productsPerPage;

  /**
   * Total number of pages for pagination (mocked as 10 in this example).
   * @type {number}
   */
  const totalPages = 10;


  /**
   * Array to store fetched products.
   * @type {Array<Object>}
   */
  let products = []

  /**
   * Error message, if any, during the fetch process.
   * @type {string|null}
   */
  let error = null;

  try {
    // Fetch products with the specified limit and skip value
    products = await fetchProducts({ limit: productsPerPage, skip})
  } catch (error) {
    // If fetching fails, set an error message
    error = "Failed to load products. Please try again later."
  }

  // If there is an error, display the error message
  if (error) {
    return (
      <div className="grid justify-center mx-auto">
        <Error />
      </div>
    );
  }

  // If products are still loading, display skeleton loaders
  if (products.length === 0 && !error) {
    return (
      <div className="grid justify-center mx-auto">
        <div className="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          {new Array(20).fill(null).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // If products are fetched successfully, I display them
  return (
    <div className="grid justify-center mx-auto">
      {/* Product Grid */}
      <div className="lg: max-w-xl mx-4 grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center my-8">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>

    </div>
  );
}

