import React from "react";

export default function RemoteChat({ content }) {
  return (
    <div className="flex justify-start mb-4">
      <img src="/image/remote-profile-pic.jpg" className="w-10 h-10 rounded-full"></img>
      <p className="text-white ml-3 bg-sky-800 px-5 py-2 rounded-xl max-w-[300px] break-words">{content}</p>
    </div>
  );
}
