import React from "react";

export default function LoadingCover() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full bg-black z-[1000000]">
      <div className="fixed w-32 h-32 animate-spin rounded-full bg-gradient-to-r from-sky-300 via-blue-600 to-sky-700">
      </div>
      <img src='/image/logo.gif' className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gray-200 rounded-full border-2 border-sky-800"></img>
    </div>
  );
}
