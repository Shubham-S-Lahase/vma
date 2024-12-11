import React from "react";

const VideoFilter = ({ filters, onFilterChange, onClearFilters }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <input
        type="text"
        name="title"
        placeholder="Filter by Title"
        value={filters.title}
        onChange={onFilterChange}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="text"
        name="tags"
        placeholder="Filter by Tags (comma-separated)"
        value={filters.tags}
        onChange={onFilterChange}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        onClick={onClearFilters}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default VideoFilter;