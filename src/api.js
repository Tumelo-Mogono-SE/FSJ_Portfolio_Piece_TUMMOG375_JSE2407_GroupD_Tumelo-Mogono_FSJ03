const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches a list of products with optional pagination.
 * 
 * @param {Object} params - The query parameters for fetching products.
 * @param {number} [params.limit=20] - The number of products to fetch (default is 20).
 * @param {number} [params.skip=0] - The number of products to skip (default is 0).
 * @returns {Promise<Object|Error>} A promise that resolves to the list of products or an error object.
 */
export async function fetchProducts ({limit = 20, lastProductId, category, sortBy, order, search} = {}) {
    const query = new URLSearchParams({
        limit,
        ...(category && { category: encodeURIComponent(category) }),
        ...(sortBy && { sortBy }),
        ...(order && { order }),
        ...(search ? { search: encodeURIComponent(search) } : {}),
        ...(lastProductId ? { lastProductId } : {})

    }).toString();

    try{
        const response = await fetch (`${apiUrl}/api/products?${query}`, {
            cache: 'force-cache',
        })
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
        const response = await fetch(`${apiUrl}/api/products/${productId}`, {
            cache: 'no-store'
        })
        if(!response.ok){
            throw new Error('Failed to fetch product')
        }

        const data = await response.json()
        return data;
    } catch(error){
        return error
    }
}

export async function fetchCategories(){
    const response = await fetch(`${apiUrl}/api/categories`, {
        cache: 'force-cache',
    });
    const data = await response.json();
    return data;
}