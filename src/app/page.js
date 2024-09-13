import { fetchProducts } from "@/api/api";
import { ProductCard } from "@/components/ProductCard";


export default async function Home() {

  const productsPerPage = 20;

  const products = await fetchProducts({ limit: productsPerPage, skip: 0})

  return (
    <div className="grid justify-center mx-auto">
      {/* Product Grid */}
      <div className="lg: max-w-xl mx-4 grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

