"use client";

import React, { useState } from "react";
import FileInput from "./components/FileInput";
import UploadResponse from "./components/UploadResponse";
import ResultDisplay from "./components/ResultDisplay";

export default function ImageUploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [uploadResponse, setUploadResponse] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("Select a file");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      alert("Please select an image to upload");
      return;
    }
    setIsUploading(true);
    await uploadImage(image);
    setIsUploading(false);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL}/upload/`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("[Upload Response]: ", data);
      setUploadResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadResponse("Failed to upload image");
    }
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div
        className="p-5 w-full h-full md:h-screen"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMHNhbGV8ZW58MHx8MHx8fDA=')`,
          backgroundSize: "cover",
        }}
      >
        {uploadResponse && (
          <div className="mt-5 p-3 rounded">
            <ResultDisplay response={uploadResponse} />
          </div>
        )}
      </div>
      <div className="w-full md:w-[800px] p-4 md:p-16 bg-amber-100">
        <h1 className="text-xl font-semibold text-center mb-4">Image Upload</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FileInput fileName={fileName} onFileChange={handleImageChange} />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-amber-900 rounded hover:bg-amber-950"
          >
            Suggest Color
          </button>
        </form>
        <UploadResponse isUploading={isUploading} response={uploadResponse} />
      </div>
    </div>
  );
}
