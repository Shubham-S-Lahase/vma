import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyVideos.css";
import withAuth from "../lib/withAuth";
import { useNavigate } from "react-router-dom";

const MyVideos = ({ user, token }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ title: "", tags: "" });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const navigate = useNavigate();

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { page, limit } = pagination;
      const response = await axios.get("/api/videos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: user.id,
          page,
          limit,
        },
      });
      setVideos(response.data.videos);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total,
        pages: response.data.pages,
      }));
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [pagination.page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handlePageChange = (direction) => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page + direction,
    }));
  };

  const filteredVideos = videos.filter((video) => {
    const titleMatch = video.title.toLowerCase().includes(filters.title.toLowerCase());
    const tagsMatch = filters.tags
      ? filters.tags.split(',').some(tag => video.tags.some(vtag => vtag.toLowerCase().includes(tag.trim().toLowerCase())))
      : true;
    return titleMatch && tagsMatch;
  });

  return (
    <div className="my-videos-container">
      <h2>My Uploaded Videos</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          name="title"
          placeholder="Filter by Title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Filter by Tags (comma-separated)"
          value={filters.tags}
          onChange={handleFilterChange}
        />
        <button onClick={() => setFilters({ title: "", tags: "" })}>Clear Filters</button>
      </div>

      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <div className="video-grid">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div
                key={video._id}
                className="video-card"
                onClick={() => navigate(`/videos/${video._id}`)}
              >
                <img
                  src="/thmb.jpeg"
                  alt={video.title}
                  className="video-thumbnail"
                />
                <h3 className="video-title">{video.title}</h3>
                <p className="video-tags">Tags: {video.tags.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>No videos found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={pagination.page === 1 || loading}
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit) || 1}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={pagination.page === Math.ceil(pagination.total / pagination.limit) || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default withAuth(MyVideos);