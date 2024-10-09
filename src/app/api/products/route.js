import { getFirestore, collection, getDocs, query, where, orderBy, limit, startAfter, getDoc, doc } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import Fuse from "fuse.js";

const db = getFirestore(app);

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get("limit")) || 20;
    
    const sortBy = searchParams.get("sortBy") || "id";
    const order = searchParams.get("order") === "desc" ? "desc" : "asc";
    const categoryFilter = searchParams.get("category") || '';
    const searchQuery = searchParams.get("search") || '';
    const lastProductId = searchParams.get("lastProductId") || '';
    const paddedLastProductId = lastProductId ? lastProductId.toString().padStart(3, '0') : null; // Fixed padding

    console.log('number after padding:', paddedLastProductId)
    try {
        let queries = collection(db, "products");

        let filters = [];

        // Apply category filter if provided
        if (categoryFilter) {
            filters.push(where("category", "==", categoryFilter));
        }

        // Apply search filter if provided
        // if (searchQuery) {
        //     filters.push(where("title", ">=", searchQuery), where("title", "<=", searchQuery + '\uf8ff')); 
        // }

        // Apply sorting and limit
        // filters.push();

        queries = query(queries, ...filters, orderBy(sortBy, order), limit(pageSize));

        if (paddedLastProductId) {
            const lastProductRef = doc(db, "products", paddedLastProductId);

            const lastProductSnap = await getDoc(lastProductRef);
            // console.log('lastpadded snap:', lastProductSnap);
            if (lastProductSnap.exists()) {
                queries = query(queries, startAfter(lastProductSnap));
                console.log('queries inside padding:', queries)
            } else {
                console.error("lastProductSnap does not exist!");
            }
        }
        // Fetch products from Firestore
        const querySnapshot = await getDocs(queries);
        console.log('queries isnapshot:',querySnapshot)
        let products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        if (searchQuery) {
            const allProductsSnapshot = await getDocs(collection(db, "products"));
            const allproducts = allProductsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            const fuse = new Fuse(allproducts, {
                keys: ['title'],
                threshold: 0.4
            });

            const searchResults = fuse.search(searchQuery);
            products = searchResults.map(item => item.item)
            // return new Response(JSON.stringify(filteredProducts), { status: 200 });
        }
        

        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
