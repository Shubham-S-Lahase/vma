import React, { useState, useEffect } from "react";
import axios from "axios";
import withAuth from "../lib/withAuth";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import VideoUpdateForm from "../components/VideoUpdateForm";
import Toast from "../components/Toast";

const VideoDetail = ({ token }) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

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
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    const fetchVideoStream = async () => {
      try {
        const response = await axios.get(`/api/videos/stream/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        });
        const videoURL = URL.createObjectURL(response.data);
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
      setSuccessMessage("Video updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating video:", error);
      setSuccessMessage("Error updating video.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  if (!video) return <p>Loading video details...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gray-100 rounded-md shadow-md">
      <VideoPlayer video={video} videoSrc={videoSrc} loading={loading} />
      <VideoUpdateForm formData={formData} handleInputChange={handleInputChange} handleSave={handleSave} />
      {successMessage && <Toast message={successMessage} />}
    </div>
  );
};

export default withAuth(VideoDetail);