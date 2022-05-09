import { useState, useRef } from "react";

import InputCodeModal from "../InputCodeModal";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  width: "70vw",
  height: "75vh",
  transform: "translate(-50%, -50%)",
  bgcolor: "#000",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function ChatFooter({ handleAddChatFromMe, handleAddCodeFromMe }) {
  const [showInputCodeModal, setShowInputCodeModal] = useState(false);

  const [message, setMessage] = useState("");
  const [codeActive, setCodeActive] = useState(false);

  const inputFile = useRef();
  const inputImage = useRef();
  
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleUploadImage = (e) =>{
    const files = e.target.files;
    if (!files.length) return;
    getBase64(files[0])
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
  };

  const handleUploadFile = (e) =>{
    console.log(e.target.value);
    if (e.target.files[0] > 1048576 * 25) {
      alert("Please input file < 25 MB");
      e.target.value = "";
    }
  };

  const handleInputOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message == "") return;
    handleAddChatFromMe(message);
    setMessage("");
  };

  const handleInputOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleOpenInputCodeModal = () => {
    setCodeActive(true);
    setShowInputCodeModal(true);
  };

  const handleCloseInputCodeModal = () => {
    setCodeActive(false);
    setShowInputCodeModal(false);
  };

  return (
    <>
      <div className="absolute left-0 bottom-0 w-full h-[40px] bg-sky-900">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              onClick={handleOpenInputCodeModal}
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-300 hover:bg-gray-300 focus:outline-none"
            >
              {!codeActive ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="h-6 w-6 text-gray-400 fill-gray-500"
                >
                  <path d="M414.8 40.79L286.8 488.8C281.9 505.8 264.2 515.6 247.2 510.8C230.2 505.9 220.4 488.2 225.2 471.2L353.2 23.21C358.1 6.216 375.8-3.624 392.8 1.232C409.8 6.087 419.6 23.8 414.8 40.79H414.8zM518.6 121.4L630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L518.6 390.6C506.1 403.1 485.9 403.1 473.4 390.6C460.9 378.1 460.9 357.9 473.4 345.4L562.7 256L473.4 166.6C460.9 154.1 460.9 133.9 473.4 121.4C485.9 108.9 506.1 108.9 518.6 121.4V121.4zM166.6 166.6L77.25 256L166.6 345.4C179.1 357.9 179.1 378.1 166.6 390.6C154.1 403.1 133.9 403.1 121.4 390.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L121.4 121.4C133.9 108.9 154.1 108.9 166.6 121.4C179.1 133.9 179.1 154.1 166.6 166.6V166.6z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="h-6 w-6 text-gray-400 fill-yellow-400"
                >
                  <path d="M414.8 40.79L286.8 488.8C281.9 505.8 264.2 515.6 247.2 510.8C230.2 505.9 220.4 488.2 225.2 471.2L353.2 23.21C358.1 6.216 375.8-3.624 392.8 1.232C409.8 6.087 419.6 23.8 414.8 40.79H414.8zM518.6 121.4L630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L518.6 390.6C506.1 403.1 485.9 403.1 473.4 390.6C460.9 378.1 460.9 357.9 473.4 345.4L562.7 256L473.4 166.6C460.9 154.1 460.9 133.9 473.4 121.4C485.9 108.9 506.1 108.9 518.6 121.4V121.4zM166.6 166.6L77.25 256L166.6 345.4C179.1 357.9 179.1 378.1 166.6 390.6C154.1 403.1 133.9 403.1 121.4 390.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L121.4 121.4C133.9 108.9 154.1 108.9 166.6 121.4C179.1 133.9 179.1 154.1 166.6 166.6V166.6z" />
                </svg>
              )}
            </button>
          </span>
          <input
            onChange={handleInputOnChange}
            onKeyDown={handleInputOnKeyDown}
            type="text"
            value={message}
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-200 placeholder-gray-600 ml-12 pl-2 bg-transparent py-1 h-[40px] w-[490px]"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              onClick={() => inputFile.current.click()}
              type="button"
              className="inline-flex items-center justify-center rounded-full h-[40px] w-[40px] transition duration-500 ease-in-out text-gray-300 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>

            <input id="file-input" ref={inputFile} type="file" className="hidden" onChange={handleUploadFile}/>

            <button
              onClick={() => inputImage.current.click()}
              type="button"
              className="inline-flex items-center justify-center rounded-full h-[40px] w-[40px] transition duration-500 ease-in-out text-gray-300 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </button>

            <input id="file-input" ref={inputImage} type="file" className="hidden" accept="image/*" onChange={handleUploadImage}/>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-[40px] w-[40px] transition duration-500 ease-in-out text-gray-300 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleSendMessage}
              type="button"
              className="inline-flex items-center justify-center rounded-lg mr-5 transition duration-500 text-white ease-in-out hover:text-gray-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <InputCodeModal
        handleAddCodeFromMe={handleAddCodeFromMe}
        handleOpenInputCodeModal={handleOpenInputCodeModal}
        showInputCodeModal={showInputCodeModal}
        handleCloseInputCodeModal={handleCloseInputCodeModal}
      />
    </>
  );
}
