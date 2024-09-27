"use client";

/**
 * A component that renders a dropdown to sort reviews by different criteria.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onSortChange - Callback function to notify the parent component when the sorting option changes.
 * This function will receive the selected sorting option as its argument.
 *
 * @returns {JSX.Element} A JSX element rendering a sort-by dropdown.
 */

export default function SortReviews({ onSortChange }) {
    /**
   * Handles the change in the sort dropdown selection and calls the parent callback with the selected value.
   *
   * @param {Object} e - The event object from the select element.
   */
    const handleSortChange = (e) => {
    onSortChange(e.target.value); // Notify parent about the selected sorting option
    };

    return (
    <div className="mb-4">
        <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
        <select
            id="sort"
            onChange={handleSortChange}
            className="text-black rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        >
            <option value="">Default</option>
            <option value="date">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="rating">Rating (Highest First)</option>
            <option value="rating-asc">Rating (Lowest First)</option>
        </select>
    </div>
    );
}