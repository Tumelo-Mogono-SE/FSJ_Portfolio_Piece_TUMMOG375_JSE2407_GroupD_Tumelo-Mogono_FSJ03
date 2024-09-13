export async function fetchProducts ({limit = 20, skip = 0} = {}) {
    const query = new URLSearchParams({
        limit,
        skip,
    }).toString();

    try{
        const response = await fetch (`https://next-ecommerce-api.vercel.app/products?${query}`)
        if (!response.ok){
            throw new Error('Failed to fetch products')
        }

        const data = await response.json()
        return data;
    } catch(error){
        return error
    }
};

export async function fetchSingleProduct(productId) {
    try{
        const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${productId}`)
        if(!response.ok){
            throw new Error('Failed to fetch product')
        }

        const data = await response.json()
        return data;
    } catch(error){
        return error
    }
}