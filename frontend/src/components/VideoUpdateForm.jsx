import React from "react";

const VideoUpdateForm = ({ formData, handleInputChange, handleSave, handleDelete }) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleInputChange}
        placeholder="Tags (comma-separated)"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save
      </button>
      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white p-3 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete
      </button>
    </div>
  );
};

export default VideoUpdateForm;