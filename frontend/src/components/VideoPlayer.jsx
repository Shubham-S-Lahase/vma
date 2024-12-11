import React from "react";

const VideoPlayer = ({ video, videoSrc, loading }) => {
  return (
    <div className="flex-1">
      {loading ? (
        <p className="text-center text-gray-600">Loading video...</p>
      ) : video.driveLink ? (
        <iframe
          src={`https://drive.google.com/file/d/${video.driveLink.split("/d/")[1].split("/")[0]}/preview`}
          className="w-full h-96 rounded-md"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={video.title}
        />
      ) : (
        <video
          controls
          src={videoSrc}
          className="w-full h-96 rounded-md"
          title={video.title}
        />
      )}
    </div>
  );
};

export default VideoPlayer;