import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Editor from "@monaco-editor/react";
import { Axios } from "../config/axios";

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

export default function OutputCodeModal({
  handleAddCodeFromMe,
  showInputCodeModal,
  handleCloseInputCodeModal,
  sentSourceCode,
  sentInputCode,
  sentOutputCode,
  sentLanguage,
  sentTimeCode,
  sentMemoryCode,
  sentWarning,
  sentInvalidCode,
}) {
  const [sendable, setSendable] = useState(false);
  const [sourceCode, setSourceCode] = useState(sentSourceCode);
  const [runCodeLoading, setRunCodeLoading] = useState(false);
  const [inputCode, setInputCode] = useState(sentInputCode);
  const [outputCode, setOutputCode] = useState(sentOutputCode);
  const [timeCode, setTimeCode] = useState(sentTimeCode);
  const [memoryCode, setMemoryCode] = useState(sentMemoryCode);
  const [warning, setWarning] = useState(sentWarning);
  const [invalidCode, setInvalidCode] = useState(sentInvalidCode);
  const [language, setLanguage] = useState(sentLanguage);
  const [theme, setTheme] = useState("vs-dark");

  useEffect(() => {
    //Nếu sửa source code hoặc input thì sẽ không cho send nữa
    setSendable(false);
  }, [inputCode, sourceCode, language]);

  useEffect(() => {
    return () => {
      //trả về trạng thái ban đầu
      if (showInputCodeModal == true) {
        setSourceCode(sentSourceCode);
        setInputCode(sentInputCode);
        setOutputCode(sentOutputCode);
        setLanguage(sentLanguage);
        setTimeCode(sentTimeCode);
        setMemoryCode(sentMemoryCode);
        setWarning(sentWarning);
        setInvalidCode(sentInvalidCode);
      }
    };
  }, [showInputCodeModal]);

  const handleSourceCode = (value) => {
    setSourceCode(value);
  };

  const handleLanguage = (newLanguage) => {
    if (language == newLanguage) return;
    setLanguage(newLanguage);
  };

  const handleInputCode = (e) => {
    setInputCode(e.target.value);
  };

  const handleClearInputCode = () => {
    setInputCode("");
  };

  const handleTheme = () => {
    const newTheme = theme == "vs-dark" ? "light" : "vs-dark";
    setTheme(newTheme);
  };

  const handleRunCode = () => {
    setTimeCode("");
    setMemoryCode("");
    if (sourceCode == "") {
      setInvalidCode(true);
      setOutputCode("Invalid source code");
      return;
    }
    setRunCodeLoading(true);
    const body = {
      source: sourceCode,
      input: inputCode,
      language: language,
    };

    Axios.post("/api/compiler/submission/create-and-get-result", body)
      .then(({ data }) => {
        console.log(data);
        if (data.warning) setWarning(data.warning);

        if (data.error) {
          setInvalidCode(true);
          setOutputCode(`status code: ${data.status.code} - ${data.status.name} \n${data.error}`);
          return;
        }

        if (data.output) {
          setInvalidCode(false);
          setOutputCode(data.output);
          setTimeCode(data.time);
          setMemoryCode(data.memory);
          return;
        }

        setInvalidCode(false);
        setOutputCode("");
      })
      .catch((err) => {
        setInvalidCode(true);
        if (err.response) setOutputCode(err.response.data);
        else setOutputCode("Internal server error");
      })
      .finally(() => {
        setRunCodeLoading(false);
        setSendable(true);
      });
  };
  return (
    <>
      <Modal
        open={showInputCodeModal}
        onClose={handleCloseInputCodeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex">
            <div className="w-[60%]">
              <div className="h-[5vh] flex items-center">
                <div className="relative mx-4 language-icon">
                  <img
                    onClick={() => handleLanguage("cpp")}
                    className={`hover-span h-6 w-6 ${
                      language == "cpp" ? "" : "grayscale"
                    } hover:grayscale-0 hover:cursor-pointer rounded-lg`}
                    src="/image/cpp.ico"
                  ></img>
                  <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[20px] left-4 z-10">
                    C++
                  </span>
                </div>
                <div className="relative mx-4 language-icon">
                  <img
                    onClick={() => handleLanguage("python")}
                    className={`hover-span h-6 w-6 ${
                      language == "python" ? "" : "grayscale"
                    } hover:grayscale-0 hover:cursor-pointer rounded-lg`}
                    src="/image/python.ico"
                  ></img>
                  <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[20px] left-4 z-10">
                    Python
                  </span>
                </div>
                <div className="relative mx-4 language-icon">
                  <img
                    onClick={() => handleLanguage("java")}
                    className={`hover-span h-6 w-6 ${
                      language == "java" ? "" : "grayscale"
                    } hover:grayscale-0 hover:cursor-pointer rounded-lg`}
                    src="/image/java.ico"
                  ></img>
                  <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[20px] left-4 z-10">
                    Java
                  </span>
                </div>
                <div className="relative mx-4 language-icon">
                  <img
                    onClick={() => handleLanguage("csharp")}
                    className={`hover-span h-6 w-6 ${
                      language == "csharp" ? "" : "grayscale"
                    } hover:grayscale-0 hover:cursor-pointer rounded-lg`}
                    src="/image/csharp.ico"
                  ></img>
                  <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[20px] left-4 z-10">
                    C#
                  </span>
                </div>
                <div className="relative mx-4 language-icon">
                  <img
                    onClick={() => handleLanguage("javascript")}
                    className={`hover-span h-6 w-6 ${
                      language == "javascript" ? "" : "grayscale"
                    } hover:grayscale-0 hover:cursor-pointer rounded-lg`}
                    src="/image/js.ico"
                  ></img>
                  <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[20px] left-4 z-10">
                    Javascript
                  </span>
                </div>
                <div className="ml-auto">
                  <input
                    type="checkbox"
                    className="checkbox hover:cursor-pointer hover:opacity-80"
                    id="checkbox"
                    onChange={handleTheme}
                  />
                  <label htmlFor="checkbox" className="label hover:cursor-pointer hover:opacity-80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 fill-yellow-500 ml-[2px] rounded-full"
                    >
                      <path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 fill-blue-500 mr-[2px] rounded-full"
                    >
                      <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
                    </svg>
                    <div className="ball" />
                  </label>
                </div>
              </div>
              <div className="h-[65vh] ml-4">
                <Editor
                  height="100%"
                  width="100%"
                  theme={theme}
                  value={sourceCode}
                  language={language}
                  onChange={handleSourceCode}
                />
              </div>
            </div>
            <div className="w-[40%] m-[5vh]">
              <textarea
                className={`w-full min-h-[10vh] h-[28vh] max-h-[28vh] overflow-auto ${
                  theme == "vs-dark" ? "bg-stone-900 text-white" : "bg-gray-100 text-black"
                } resize-y rounded-md p-2 font-mono`}
                placeholder="input"
                value={inputCode}
                onChange={handleInputCode}
              ></textarea>
              <div className="h-[8vh] flex justify-end items-center">
                {sendable ? (
                  <div className="relative mr-auto">
                    <button
                      onClick={() => {
                        handleAddCodeFromMe({
                          sentSourceCode: sourceCode,
                          sentInputCode: inputCode,
                          sentOutputCode: outputCode,
                          sentLanguage: language,
                          sentTimeCode: timeCode,
                          sentMemoryCode: memoryCode,
                          sentWarning: warning,
                          sentInvalidCode: invalidCode,
                        });
                        handleCloseInputCodeModal();
                      }}
                      className="hover-span text-white bg-sky-600 w-8 h-8 flex items-center justify-center rounded hover:bg-opacity-70"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-[18px] w-[18px] fill-white"
                      >
                        <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
                      </svg>
                    </button>
                    <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[30px] left-6 z-10">
                      Send
                    </span>
                  </div>
                ) : (
                  <div className="relative mr-auto">
                    <div className="hover-span text-white bg-sky-600 w-8 h-8 flex items-center justify-center rounded opacity-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-[18px] w-[18px] fill-white"
                      >
                        <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
                      </svg>
                    </div>
                    <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[30px] left-6 z-10">
                      Send
                    </span>
                  </div>
                )}
                <div className="relative ">
                  <button
                    className="hover-span w-8 h-8 rounded-lg bg-sky-500 text-white text-sm font-medium flex items-center justify-center mr-2"
                    onClick={handleClearInputCode}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="h-[18px] w-[18px] fill-white"
                    >
                      <path d="M93.13 257.7C71.25 275.1 53 313.5 38.63 355.1L99 333.1c5.75-2.125 10.62 4.749 6.625 9.499L11 454.7C3.75 486.1 0 510.2 0 510.2s206.6 13.62 266.6-34.12c60-47.87 76.63-150.1 76.63-150.1L256.5 216.7C256.5 216.7 153.1 209.1 93.13 257.7zM633.2 12.34c-10.84-13.91-30.91-16.45-44.91-5.624l-225.7 175.6l-34.99-44.06C322.5 131.9 312.5 133.1 309 140.5L283.8 194.1l86.75 109.2l58.75-12.5c8-1.625 11.38-11.12 6.375-17.5l-33.19-41.79l225.2-175.2C641.6 46.38 644.1 26.27 633.2 12.34z" />
                    </svg>
                  </button>
                  <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[30px] left-6 z-10">
                    Clear
                  </span>
                </div>
                {!runCodeLoading ? (
                  <div className="relative">
                    <button
                      className="hover-span w-8 h-8 rounded-lg bg-sky-500 text-white text-sm font-medium flex items-center justify-center"
                      onClick={handleRunCode}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="h-[18px] w-[18px] fill-white"
                      >
                        <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                      </svg>
                    </button>
                    <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[30px] left-6 z-10">
                      Run
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="hover-span relative w-8 h-8 rounded-lg bg-sky-500 text-white text-sm font-medium flex items-center justify-center animate-pulse">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-[18px] w-[18px] fill-white animate-spin"
                      >
                        <path d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z" />
                      </svg>
                    </div>
                    <span className="span-hover bg-black rounded-lg bg-gray-900 text-white px-2 text-[12px] absolute top-[25px] left-4 z-10">
                      Compiling
                    </span>
                  </div>
                )}
              </div>
              <div className="relative">
                <textarea
                  className={`w-full min-h-[10vh] h-[28vh] max-h-[28vh] overflow-auto ${
                    theme == "vs-dark" ? "bg-stone-900 text-white" : "bg-gray-100 text-black"
                  } ${
                    invalidCode ? "text-red-500" : "text-white"
                  } resize-y rounded-md p-2 font-mono focus:outline-none`}
                  type="text"
                  disabled
                  placeholder="output"
                  value={outputCode}
                ></textarea>
                {warning ? (
                  <>
                    <div className="absolute hover-span h-5 w-5 right-2 top-2 bg-yellow-600 flex justify-center items-center text-white rounded-full hover:opacity-70 hover:cursor-pointer">
                      !
                    </div>
                    <div className="absolute span-hover right-5 top-5 bg-gray-700 p-1 text-[12px] rounded-lg text-gray-300">
                      {warning}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              {timeCode && memoryCode ? (
                <div className="text-gray-300 text-sm">
                  time : {timeCode} s; memory : {memoryCode} kB
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <style jsx>{`
        .span-hover {
          display: none;
        }

        .hover-span:hover + .span-hover {
          display: block;
        }

        .checkbox {
          opacity: 0;
          position: absolute;
        }

        .label {
          width: 63px;
          height: 28px;
          background-color: #333;
          display: flex;
          border-radius: 50px;
          align-items: center;
          justify-content: space-between;
          padding: 5px;
          position: relative;
        }

        .ball {
          width: 24px;
          height: 24px;
          background-color: white;
          position: absolute;
          top: 2px;
          left: 2px;
          border-radius: 50%;
          transition: transform 0.2s linear;
        }

        .checkbox:checked + .label .ball {
          transform: translateX(35px);
        }
      `}</style>
    </>
  );
}
