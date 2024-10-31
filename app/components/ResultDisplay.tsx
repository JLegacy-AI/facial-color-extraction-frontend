"use client";

import React from "react";

interface Response {
  eye_color: string;
  skin_tone: string;
  hair_color: string;
  dress_color: string[]; // Keep the original structure as an array of strings
}

interface Props {
  response: string;
}

const ResultDisplay: React.FC<Props> = ({ response }) => {
  // Parse the string response into an object
  let parsedResponse: Response;

  try {
    parsedResponse = JSON.parse(response);
  } catch (error) {
    console.error("Failed to parse response:", error);
    return <div className="text-red-500">Failed to load response.</div>;
  }

  const { eye_color, skin_tone, hair_color, dress_color } = parsedResponse;

  // Map dress_color strings to objects with name and code
  const dressColors = dress_color.map((color) => {
    const [name, code] = color.split(":"); // Split the string into name and color code
    return { name, code };
  });

  return (
    <div className="p-5 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Analysis Result
      </h2>

      {/* Single Line for Eye Color, Skin Tone, and Hair Color */}
      <div className="flex justify-around p-4 bg-black/20 rounded mb-4">
        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-2xl font-bold">👁️</span>
          <h3 className="text-lg font-semibold text-blue-700">Eye Color</h3>
          <p className="text-gray-700 font-bold">{eye_color}</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-green-500 text-2xl font-bold">👤</span>
          <h3 className="text-lg font-semibold text-green-700">Skin Tone</h3>
          <p className="text-gray-700 font-bold">{skin_tone}</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-yellow-500 text-2xl font-bold">💇‍♀️</span>
          <h3 className="text-lg font-semibold text-yellow-700">Hair Color</h3>
          <p className="text-gray-700 font-bold">{hair_color}</p>
        </div>
      </div>

      {/* Dress Colors Section */}
      <div className="p-4 border-l-4 border-amber-900 bg-amber-100 rounded">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">
          Dress Colors
        </h3>
        <div className="flex flex-wrap">
          {dressColors.map((color, index) => (
            <div
              key={index}
              className="m-2 p-3 text-center rounded-lg text-white font-bold"
              style={{
                backgroundColor: color.code,
                minWidth: "100px",
              }}
            >
              {color.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
