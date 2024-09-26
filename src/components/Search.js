"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Searchbar() {
    const [query, setQuery] = useState('')
    const router = useRouter();

    function handleSearch (e) {
        e.preventDefault();
        router.push(`/?search=${encodeURIComponent(query)}`)
    }

    return (
        <form onSubmit={handleSearch} className="flex justify-center mt-8">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full max-w-lg px-4 py-2 border-2 border-gray-400 rounded-l-md focus:ring-2 focus:border-gray-600 text-black"
            />
            <button
                type="submit"
                className="px-6 py-2 text-white bg-cyan-700 hover:bg-gray-600 rounder-r-md shadow-md transition-all duration-300"
            >
                Search
            </button>
        </form>
    )

    
}