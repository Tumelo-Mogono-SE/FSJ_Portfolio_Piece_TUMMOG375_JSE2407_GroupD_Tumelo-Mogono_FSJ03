"use client";

export default function SortReviews({ onSortChange }) {
  // Handle the change in sorting options
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