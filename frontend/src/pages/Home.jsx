import React, { useState } from "react";
import withAuth from "../lib/withAuth";
import { useNavigate } from "react-router-dom";
import VideoUploadForm from "../components/VideoUploadForm";
import UploadInstructions from "../components/UploadInstructions";
import Toast from "../components/Toast";

const Home = ({ token }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    setToastMessage("Video uploaded successfully!");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
    navigate("/my-videos");
  };

  const handleUploadFailure = () => {
    setToastMessage("Error uploading video.");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Upload Video
      </h2>
      <VideoUploadForm token={token} onUploadSuccess={handleUploadSuccess}  onUploadFailure={handleUploadFailure} />
      <UploadInstructions />
      {toastVisible && <Toast message={toastMessage} />}
    </div>
  );
};

export default withAuth(Home);