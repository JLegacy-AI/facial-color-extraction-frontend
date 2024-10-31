"use client";

import React from "react";

interface UploadResponseProps {
  isUploading: boolean;
  response: string;
}

const UploadResponse: React.FC<UploadResponseProps> = ({
  isUploading,
  response,
}) => {
  return (
    <>
      {isUploading && (
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">.</span>
          </div>
        </div>
      )}
      {/* {response && (
        <div className="mt-5 p-3 bg-gray-100 rounded shadow">
          <ResultDisplay response={response} />
        </div>
      )} */}
    </>
  );
};

export default UploadResponse;
