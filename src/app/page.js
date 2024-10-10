import { fetchProducts } from "@/api";
import { ProductCard } from "@/components/ProductCard";
import PaginationComponent from "@/components/Pagination";
import CardSkeleton from "@/components/LoaderSkeletons/CardSkeleton";
import SortDropdown from "@/components/Sort";
import Filter from "@/components/CategoryFilter";
import Searchbar from "@/components/Search";
import { fetchCategories } from "@/api";
import ResetButton from "@/components/ResetButton";

export const metadata = {
  title: "SwiftCart E-commerce Store",
  description: "Welcome to our e-commerce store, offering great products.",
  keywords: "e-commerce, products, buy online, shopping",
};


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
  // const totalPages = 10;

  const sortBy = searchParams.sortBy || 'id';
  const order = searchParams.order || 'asc';
  const selectedCategory = searchParams.category || '';
  const searchQuery = searchParams.search || '';
  let lastProductId = searchParams.lastProductId || null;

  /**
   * Array to store available categories.
   * @type {Array<string>}
   */
  let categories = []


  /**
   * Array to store fetched products for the current page..
   * @type {Array<Object>}
   */
  let products = []

  /**
   * Array to store all fetched products for determining total number of pages.
   * @type {Array<Object>}
   */
  let productsFromArray = []

  let lastProductIds = [];

  if (productsFromArray.length === 0) {
    productsFromArray = await fetchProducts({ limit: 1000, category: selectedCategory, sortBy, order, search: searchQuery });
  }

  /**
   * Error message, if any, during the fetch process.
   * @type {string|null}
   */
  let error = null;

  try {

    // // Fetch all products to calculate total number of pages
    // productsFromArray = await fetchProducts({limit: 1000 , skip: 0, category: selectedCategory, sortBy, order, search: searchQuery })

    // Calculate lastProductId for each page
    for (let i = 0; i < productsFromArray.length; i += productsPerPage) {
      const lastProductInPage = productsFromArray[Math.min(i + productsPerPage - 1, productsFromArray.length - 1)];
      lastProductIds.push(lastProductInPage.id); // store lastProductId for each page
    }

    // Get the correct lastProductId for the previous page if we're on page > 1
    if (currentPage > 1) {
      lastProductId = lastProductIds[currentPage - 2]; // get the lastProductId from the previous page
    }

    // Fetch products with the specified limit and skip value
    products = await fetchProducts({ limit: productsPerPage, lastProductId, category: selectedCategory, sortBy, order, search: searchQuery })
    

    // Fetch categories
    categories = await fetchCategories();
  } catch (error) {
    console.error("Error fetching products:", error);
    // If fetching fails, set an error message
    error = "Failed to load products. Please try again later."
  }


  /**
   * Total number of products fetched to calculate pagination.
   * @type {number}
   */
  let productsLength = productsFromArray.length
  console.log(productsLength)

  /**
   * Total number of pages for pagination.
   * @type {number}
   */
  let totalPages = Math.ceil(productsLength / productsPerPage)

  // If there is an error, display the error message
  if (error) {
    throw error
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
    <>
      

      <div className="grid justify-center mx-auto">

        <div>
          <div className="grid lg:flex  lg:items-start  mt-3 mx-auto justify-center">
            <Searchbar />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-4">
            <SortDropdown />
            <Filter categories={categories} selectedCategory={selectedCategory} />
          </div>
          <div className="flex justify-end my-4 mx-4">
            <ResetButton
              search={searchQuery}
              sortBy={sortBy}
              order={order}
              category={selectedCategory}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg: max-w-xl mx-4 grid gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 md:mx-1 items-center lg:max-w-none my-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Pagination Component */}
        <div className="flex justify-center my-8">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            lastProductIds={lastProductIds}
          />
        </div>

    </div>
    </>
    
  );
}

