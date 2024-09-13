/**
 * Fetches a list of products with optional pagination.
 * 
 * @param {Object} params - The query parameters for fetching products.
 * @param {number} [params.limit=20] - The number of products to fetch (default is 20).
 * @param {number} [params.skip=0] - The number of products to skip (default is 0).
 * @returns {Promise<Object|Error>} A promise that resolves to the list of products or an error object.
 */
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

/**
 * Fetches a single product by its ID.
 * 
 * @param {string|number} productId - The ID of the product to fetch.
 * @returns {Promise<Object|Error>} A promise that resolves to the product data or an error object.
 */
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