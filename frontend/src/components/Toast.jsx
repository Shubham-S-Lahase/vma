import React from "react";

const Toast = ({ message }) => {
  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-green-100 border border-green-300 text-green-700 rounded-md shadow-md">
      {message}
    </div>
  );
};

export default Toast;
