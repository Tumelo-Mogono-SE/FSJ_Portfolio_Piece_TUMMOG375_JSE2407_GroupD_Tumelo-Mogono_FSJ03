'use client';
import ProductDetail from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchSingleProduct } from "@/api/api";

export default function ProductPage() {
    const [product, setProduct] = useState(null);  // Initialize with null to handle loading state
    const { id } = useParams();

    useEffect(() => {
    async function getSingleProduct(id) {
        const productData = await fetchSingleProduct(id);  
        setProduct(productData);  
    }

    if (id) {
        getSingleProduct(id);  
    }
    }, [id]); 


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ProductDetail {...product} />
        </div>
    );
}