"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * ResetButton is a component that resets search, sorting, and category filters.
 * It appears only if any of these query parameters are active.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} search - The current search query.
 * @param {string} sortBy - The current sorting parameter.
 * @param {string} order - The current sorting order.
 * @param {string} category - The current selected category.
 */
export default function ResetButton({ search, sortBy, order, category }) {
    const router = useRouter();
    const [showButton, setShowButton] = useState(false);

    // Check if any filters are applied
    useEffect(() => {
        if (search || sortBy !== 'id' || order !== 'asc' || category) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [search, sortBy, order, category]);

    // Reset all filters, sorting, and search parameters
    const handleReset = () => {
        router.replace('/');
    };

    if (!showButton) return null;

    return (
        <button
            onClick={handleReset}
            className="px-2 py-1 mt-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
        >
            Reset Filters & Sorting
        </button>
    );
}