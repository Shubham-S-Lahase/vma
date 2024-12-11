import React, { useState } from "react";
import axios from "axios";

const VideoUploadForm = ({ token, onUploadSuccess, onUploadFailure }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    file: null,
    driveLink: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const isGoogleDriveLink = (url) => {
    return url && url.includes("drive.google.com");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const { title, description, tags, file, driveLink } = formData;

    if (!file && !driveLink) {
      onUploadFailure("Please upload a video file or provide a Google Drive link.");
      setUploading(false);
      return;
    }

    if (file && driveLink) {
      onUploadFailure("You can either upload a video file or provide a Google Drive link, not both.");
      setUploading(false);
      return;
    }

    if (driveLink && !isGoogleDriveLink(driveLink)) {
      onUploadFailure("The link does not appear to be a valid Google Drive link.");
      setUploading(false);
      return;
    }

    if (driveLink) {
      onUploadFailure("Please ensure the Google Drive video link is publicly accessible. Open it in incognito mode to check.");
    }

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
      // console.log(response.data);
      onUploadSuccess();
    } catch (error) {
      onUploadFailure(error.response?.data?.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="title" className="block text-gray-700 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>
      <div className="space-y-2">
        <label htmlFor="tags" className="block text-gray-700 font-medium">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="file" className="block text-gray-700 font-medium">
          Upload File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleChange}
          className=" w-full"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="driveLink"
          className="block text-gray-700 font-medium"
        >
          Or Enter Google Drive Video Link
        </label>
        <input
          type="text"
          id="driveLink"
          name="driveLink"
          value={formData.driveLink}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className={`w-full px-4 py-2 rounded-lg font-bold text-white ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 transition"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default VideoUploadForm;