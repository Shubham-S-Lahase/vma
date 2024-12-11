import React from "react";

const VideoCard = ({ video, onClick }) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
      onClick={onClick}
    >
      <img
        src="/thmb.jpeg"
        alt={video.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
        <p className="text-sm text-gray-600">Tags: {video.tags.join(", ")}</p>
      </div>
    </div>
  );
};

export default VideoCard;