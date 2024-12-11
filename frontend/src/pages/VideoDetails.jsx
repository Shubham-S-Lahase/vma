import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VideoDetail.css";
import withAuth from "../lib/withAuth";
import { useParams, useNavigate } from "react-router-dom";

const VideoDetail = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [loading, setLoading] = useState(true); // For loader
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`/api/videos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideo(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          tags: response.data.tags.join(", "),
        });

        if (!response.data.driveLink) {
          fetchVideoStream();
        } else {
          setLoading(false); // No need to load if it's a Google Drive video
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    const fetchVideoStream = async () => {
      try {
        const response = await axios.get(`/api/videos/stream/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Get the video as a blob
        });
        const videoURL = URL.createObjectURL(response.data); // Create a URL for the video blob
        setVideoSrc(videoURL);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video stream:", error);
      }
    };

    fetchVideoDetails();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `/api/videos/${id}`,
        {
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Video updated successfully!");
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  if (!video) return <p>Loading video details...</p>;

  return (
    <div className="video-detail-container">
      <div className="video-player">
        {loading ? (
          <p>Loading video...</p>
        ) : video.driveLink ? (
          <iframe
            src={`https://drive.google.com/file/d/${
              video.driveLink.split("/d/")[1].split("/")[0]
            }/preview`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <video
            controls
            src={videoSrc}
            title={video.title}
            onLoadedData={() => setLoading(false)} // Set loading false after video data loads
          />
        )}
      </div>
      <div className="video-details">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          placeholder="Tags (comma-separated)"
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default withAuth(VideoDetail);
