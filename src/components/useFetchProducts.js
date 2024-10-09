import { useEffect, useState } from 'react';
import { fetchProducts } from '@/api';

const useFetchProducts = (params) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const cachedData = localStorage.getItem('products');
            if (cachedData) {
                setProducts(JSON.parse(cachedData));
            } else {
                const fetchedProducts = await fetchProducts(params);
                setProducts(fetchedProducts);
                localStorage.setItem('products', JSON.stringify(fetchedProducts));
            }
        };

        loadProducts();
    }, [params]);

    return products;
};

export default useFetchProducts;