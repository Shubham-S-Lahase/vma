// Pagination.js
import React from "react";

const Pagination = ({ pagination, onPageChange, loading }) => {
  return (
    <div className="flex items-center justify-center mt-6 space-x-4">
      <button
        onClick={() => onPageChange(-1)}
        disabled={pagination.page === 1 || loading}
        className={`px-4 py-2 text-white rounded-lg ${
          pagination.page === 1 || loading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } transition`}
      >
        Previous
      </button>
      <span className="text-gray-600">
        Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit) || 1}
      </span>
      <button
        onClick={() => onPageChange(1)}
        disabled={pagination.page === Math.ceil(pagination.total / pagination.limit) || loading}
        className={`px-4 py-2 text-white rounded-lg ${
          pagination.page === Math.ceil(pagination.total / pagination.limit) || loading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } transition`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;