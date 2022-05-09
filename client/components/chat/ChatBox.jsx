import React from "react";
import RemoteChat from "./chat/RemoteChat";
import MeChat from "./chat/MeChat";
import ChatHeader from "./chat/ChatHeader";
import RemoteJoined from "./chat/RemoteJoined";
import RemoteLeft from "./chat/RemoteLeft";
import ChatFooter from "./chat/ChatFooter";

export default function ChatBox() {
  return (
    <div className="flex-1 p-2 flex flex-col absolute left-[55%] w-[40%] max-w-[40%] h-[22.5vw] top-[50px] bg-gray-100 rounded">
      <ChatHeader />
      <div
        id="messages"
        className="flex flex-col space-y-3 p-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <RemoteJoined />
      </div>
      <ChatFooter />
    </div>
  );
}
