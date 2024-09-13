import { fetchProducts } from "@/api/api";
import { ProductCard } from "@/components/ProductCard";
import PaginationComponent from "@/components/Pagination";

export default async function Home({ searchParams }) {

  const productsPerPage = 20;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const skip = (currentPage - 1) * productsPerPage;
  const totalPages = 10;


  const products = await fetchProducts({ limit: productsPerPage, skip})

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

