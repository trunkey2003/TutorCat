import React from "react";

export default function MeChat({content, children}) {
  return (
    <div className="flex justify-end mb-4">
      <p className="text-white mr-3 bg-sky-800 px-5 py-2 rounded-xl max-w-[300px] break-words">{content || children}</p>
      <img src="/image/my-profile-pic.jpg" className="w-10 h-10 rounded-full"></img>
    </div>
  );
}
