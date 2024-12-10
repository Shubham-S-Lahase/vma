import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import withAuth from "../lib/withAuth";
import { useNavigate } from "react-router-dom";

const Home = ({ token }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    file: null,
    driveLink: "",
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Validate if Google Drive link is valid
  const isGoogleDriveLink = (url) => {
    return url && url.includes("drive.google.com");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage("");

    const { title, description, tags, file, driveLink } = formData;

    // Ensure only one input (file or driveLink) is provided
    if (!file && !driveLink) {
      setMessage("Please upload a video file or provide a Google Drive link.");
      setUploading(false);
      return;
    }

    if (file && driveLink) {
      setMessage(
        "You can either upload a video file or provide a Google Drive link, not both."
      );
      setUploading(false);
      return;
    }

    // If Google Drive link is provided, check if it's valid
    if (driveLink && !isGoogleDriveLink(driveLink)) {
      setMessage("The link does not appear to be a valid Google Drive link.");
      setUploading(false);
      return;
    }

    // If Google Drive link is provided, ask user to check if it's accessible
    if (driveLink) {
      setMessage(
        "Please ensure the Google Drive video link is publicly accessible. Open it in incognito mode to check."
      );
    }

    // Prepare form data for submission
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("tags", tags);
    if (file) data.append("file", file);
    if (driveLink) data.append("driveLink", driveLink);

    try {
      const response = await axios.post("/api/videos/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      navigate("/my-videos");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="video-upload-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload File</label>
          <input type="file" id="file" name="file" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="driveLink">Or Enter Google Drive Video Link</label>
          <input
            type="text"
            id="driveLink"
            name="driveLink"
            value={formData.driveLink}
            onChange={handleChange}
          />
        </div>
        <button className="updBtn" type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}

      {formData.driveLink && (
        <div className="info-message">
          <p>
            Please ensure that the Google Drive video link is publicly
            accessible. You can check this by:
          </p>
          <ul>
            <li>
              Open the link in an incognito window (not logged into your Google
              account).
            </li>
            <li>
              If the video plays without requiring login, the link is
              accessible.
            </li>
            <li>
              If the video asks for permissions, please adjust the sharing
              settings of the video to "Anyone with the link" and "Viewer"
              access.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default withAuth(Home);
