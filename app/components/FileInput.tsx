"use client";

import React from "react";

interface FileInputProps {
  fileName: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ fileName, onFileChange }) => {
  return (
    <label className=" flex flex-col w-full items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-amber-900">
      <svg
        className="w-8 h-8"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M16.7,5.3 L11,0.6 C10.4,0 9.6,0 9,0.6 L3.3,5.3 C2.7,5.9 2.7,6.7 3.3,7.3 L4,8 L16,8 L16.7,7.3 C17.3,6.7 17.3,5.9 16.7,5.3 Z M18,9 L2,9 L2,18 C2,18.6 2.4,19 3,19 L17,19 C17.6,19 18,18.6 18,18 L18,9 Z"></path>
      </svg>
      <span className="text-base leading-normal">{fileName}</span>
      <input
        type="file"
        className="hidden"
        onChange={onFileChange}
        accept="image/*"
      />
    </label>
  );
};

export default FileInput;
