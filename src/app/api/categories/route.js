import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";

const db = getFirestore(app);

export async function GET() {
    try {
        const docRef = doc(db, "categories", "allCategories");
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return new Response(JSON.stringify({ error: "Categories not found"}), { status: 404 });
        }

        return new Response(JSON.stringify(docSnap.data().categories), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}