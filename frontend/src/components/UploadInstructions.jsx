import React from "react";

const UploadInstructions = () => {
  return (
    <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
      <p className="mb-2 text-gray-700 font-medium">
        Please ensure that the Google Drive video link is publicly accessible:
      </p>
      <ul className="list-disc ml-6 text-gray-600 space-y-1">
        <li>
          Open the link in an incognito window to confirm it doesn't require
          login.
        </li>
        <li>
          Adjust the sharing settings to "Anyone with the link" and "Viewer"
          access if necessary.
        </li>
      </ul>
    </div>
  );
};

export default UploadInstructions;