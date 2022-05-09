import React from "react";

export default function RemoteHeader() {
    return (
        <div className="flex sm:items-center justify-between p-2 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
                <div className="relative">
                    <span className="absolute text-green-500 right-0 bottom-0">
                        <svg width="20" height="20">
                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                        </svg>
                    </span>
                    <img src="https://trunkey2003.github.io/general-img/CHONGU.jpg" className="w-[50px] h-[50px] rounded-full" />
                </div>
                <div className="flex flex-col leading-tight">
                    <div className="text-lg mt-1 flex items-center">
                        <span className="text-gray-700 mr-3">Ho Quang Lam</span>
                    </div>
                    <span className="text-md text-gray-600">Student</span>
                </div>
            </div>
        </div>
    );
}
