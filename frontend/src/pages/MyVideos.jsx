import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import withAuth from "../lib/withAuth";
import VideoCard from "../components/VideoCard";
import VideoFilter from "../components/VideoFilter";
import Pagination from "../components/Pagination";

const fetchVideos = async ({ queryKey }) => {
  const [_key, { userId, page, limit, token }] = queryKey;
  const response = await axios.get("/api/videos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { userId, page, limit },
  });
  return response.data;
};


const MyVideos = ({ user, token }) => {
  const [filters, setFilters] = useState({ title: "", tags: "" });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "videos",
      { userId: user.id, page: pagination.page, limit: pagination.limit, token },
    ],
    queryFn: fetchVideos,
    keepPreviousData: true,
  });

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

  const handleClearFilters = () => {
    setFilters({ title: "", tags: "" });
  };

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading videos: {error.message}
      </p>
    );
  }

  const filteredVideos = (data?.videos || []).filter((video) => {
    const titleMatch = video.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const tagsMatch = filters.tags
      ? filters.tags
          .split(",")
          .some((tag) =>
            video.tags.some((vtag) =>
              vtag.toLowerCase().includes(tag.trim().toLowerCase())
            )
          )
      : true;
    return titleMatch && tagsMatch;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        My Uploaded Videos
      </h2>

      {/* Filters */}
      <VideoFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <p className="text-center text-gray-600">Loading videos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onClick={() => navigate(`/videos/${video._id}`)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No videos found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        pagination={{ ...pagination, total: data?.total || 0 }}
        onPageChange={handlePageChange}
        loading={isLoading}
      />
    </div>
  );
};

export default withAuth(MyVideos);
