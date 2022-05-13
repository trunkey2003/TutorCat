import Link from "next/link";
import React from "react";

export default function ErrorUnsupportedBrowser() {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-60 z-[100000000] text-white flex justify-center items-center">
        <div>
        <img src="/image/logo.gif" className="h-32 w-32 mx-auto rounded-full"></img>
        <div className="text-center text-[70px]">Unsupported browser error</div>
        <div className="text-center text-[30px]">We currently don't support this browser</div>
        <div className="px-3 py-1 rounded bg-sky-400 font-medium hover:cursor-pointer animate-pulse text-[40px] mt-4 text-center" onClick={() => window.location.href = window.location.origin + '/live'}>Back to Home</div>
        </div>
    </div>
  );
}
