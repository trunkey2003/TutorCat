import { useEffect, useState, useRef, useCallback } from "react";
import Peer from "peerjs";
import Draggable from "react-draggable";
import { io } from "socket.io-client";
import Loading from "./Loading";
import { Axios } from "../config/axios";
import Error from "./Error";
// import ErrorPermissionMicroHost from './ErrorPermissionMicroHost';
// import ErrorPermissionCameraHost from './ErrorPermissionCameraHost';
// import ErrorPermissionMicroJoiner from './ErrorPermissionMicroJoiner';
// import ErrorPermissionCameraJoiner from "./ErrorPermissionCameraJoiner";
import ChatBreak from "./chat/ChatBreak";
import RemoteChat from "./chat/RemoteChat";
import MeChat from "./chat/MeChat";
import ChatFooter from "./chat/ChatFooter";
import OutputCodeFromMe from "./OutputCodeFromMe";
import OutputCodeFromRemote from "./OutputCodeFromRemote";
import HostLeft from "./HostLeft";

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`);
var created;

export default function LiveRoom({ roomID }) {
  const [shareAudio, setShareAudio] = useState(true);
  const [shareCam, setShareCam] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);

  const [myCallScreenOff, setMyCallScreenOff] = useState(true);
  const [remoteCallScreenOff, setRemoteCallScreenOff] = useState(null);
  const [remoteShareAudio, setRemoteShareAudio] = useState(true);

  const [alerts, setAlerts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const [myName, setMyName] = useState("");
  const [remoteSocketID, setRemoteSocketID] = useState("");

  const [missingPermissions, setMissingPermissions] = useState([]);

  const [classChatBox, setClassChatBox] = useState("w-0 hidden");
  const [classChatToogle, setClassChatToogle] = useState("left-0");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const myCallTrack = useRef();
  const myCallStream = useRef();
  const myWebcamStream = useRef();
  const myScreenStream = useRef();
  const myPeer = useRef();
  const myMediaConnection = useRef();
  const myVideo = useRef();
  const remoteVideo = useRef();
  const alertsRef = useRef([]);

  useEffect(() => {
    setLoading(true);
    socket.on("me", (socketID) => {
      Axios.put(`/api/room/join/${roomID}/${socketID}`)
        .then(({ data }) => {
          setMyName(data.userName1);
          created = data.userCount == 1 ? false : true;
          if (!created) {
            handleCreateRoom();
          } else {
            handleJoinRoom(socketID);
            handleAddChatBreak("You have joined room");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("404");
          setLoading(false);
        });
    });
  }, []);

  useEffect(() => {
    socket.on("remote turned webcam off", () => {
      setRemoteCallScreenOff(true);
      handleRemoteCallScreen(null);
    });

    socket.on("remote turned webcam on", () => {
      setRemoteCallScreenOff(false);
    });

    socket.on("remote started sharing screen", () => {
      setRemoteCallScreenOff(false);
      handleAddChatBreak("Remote started sharing screen");
    });

    socket.on("remote stoped sharing screen", () => {
      setRemoteCallScreenOff(true);
      handleRemoteCallScreen(null);
      handleAddChatBreak("Remote stoped sharing screen");
    });

    socket.on("remote started sharing audio", () => {
      console.log("remote started sharing audio");
      setRemoteShareAudio(true);
    });

    socket.on("remote stoped sharing audio", () => {
      console.log("remote stoped share audio");
      setRemoteShareAudio(false);
    });
  }, [messages]);

  useEffect(() => {
    if (classChatBox == "show-chat-box" && unreadMessages > 0) {
      setUnreadMessages(0);
    }
  }, [classChatBox]);

  useEffect(() => {
    if (!created) {
      socket.on("remote join room", (id) => {
        setRemoteSocketID(id);
        myMediaConnection.current = myPeer.current.call("joiner-" + roomID, myCallStream.current);
        myMediaConnection.current?.on("stream", (stream) => {
          //4/5/2022 Khong biet tai sao co luc myMediaConnection.currunt lai la undefined o day
          //7/5/2022 Co ve la do socket chưa dc re-render khi bỏ trong useEffect với []
          handleRemoteCallScreen(stream);
        });
        setRemoteCallScreenOff(true);
        handleAddAlert("New attendance !", id + " has joined your room");
      });

      socket.on("remote leave call", () => {
        myMediaConnection.current?.close();
        myMediaConnection.current = null;
        setRemoteCallScreenOff(null);
        handleAddAlert("Attendance left !", remoteSocketID + " has left your room");
        setRemoteSocketID(null);
      });
    }

    socket.on("remote chatted", (message) => {
      handleAddChatFromRemote(message);
      handleRemoteNewMessage();
    });

    socket.on("remote sent code", (message) => {
      handleAddCodeFromRemote(message);
      handleRemoteNewMessage();
    });

    socket.on("new chat break", (content) => {
      handleAddChatBreak(content);
    });
    // return () => socket.disconnect();
  }, [alerts, messages, remoteSocketID, unreadMessages, classChatBox, socket]);

  const handleRemoteNewMessage = useCallback(() => {
    console.log(messages);
    if (classChatBox == "hide-chat-box" || classChatBox == "w-0 hidden") {
      setUnreadMessages(unreadMessages + 1);
    }
  }, [unreadMessages, classChatBox]);

  const handleAddCodeFromMe = useCallback(
    (content) => {
      setMessages([...messages, { from: "me", content: content, type: "output code" }]);
      socket.emit("me send code", { content: content, roomID: roomID });
    },
    [messages]
  );

  const handleAddCodeFromRemote = useCallback(
    (content) => {
      setMessages([...messages, { from: "remote", content: content, type: "output code" }]);
    },
    [messages]
  );

  const handleAddChatBreak = useCallback(
    (content) => {
      setMessages([...messages, { content: content, type: "chat break" }]);
    },
    [messages]
  );

  const handleAddChatFromMe = useCallback(
    (content) => {
      setMessages([...messages, { from: "me", content: content, type: "chat" }]);
      socket.emit("me chat", { content: content, roomID: roomID });
    },
    [messages]
  );

  const handleAddChatFromRemote = useCallback(
    (content) => {
      setMessages([...messages, { from: "remote", content: content, type: "chat" }]);
    },
    [messages]
  );

  const handleAddAlert = useCallback(
    (title, content) => {
      setAlerts([...alerts, { title: title, content: content }]);
    },
    [alerts]
  );

  const handleDeleteAlert = useCallback(
    (index) => {
      const _alerts = [...alerts];
      _alerts.splice(index, 1);
      alertsRef.current = [..._alerts]; //Không biết tại sao dùng alersRef thì lại ko dc @_@
      console.log(alertsRef.current);
      setAlerts(_alerts);
    },
    [alerts]
  );

  const handleMyCallScreen = (stream) => {
    myVideo.current.srcObject = stream;
    myVideo.current.muted = true;
    myVideo.current.play();
    myCallStream.current = stream;
  };

  const handleRemoteCallScreen = (stream) => {
    remoteVideo.current.srcObject = stream;
    remoteVideo.current.play();
  };

  const handleEndCall = () => {
    setLoading(true);
    window.location.href = window.location.origin + "/live";
  };

  const handleStartShareScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: { mediaSource: "screen" }, audio: true })
      .then(async (stream) => {
        myWebcamStream.current?.getTracks().forEach((track) => track.stop());
        myCallTrack.current?.stop();
        myCallTrack.current = stream.getTracks().filter((track) => track.kind == "video")[0];
        socket.emit("start sharing screen", roomID);
        let finalStream = null;
        //audio của người dùng
        if (shareAudio) {
          const audio = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

          finalStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()]);

          //Luu screen stream de ti hoi ngat ket noi
          myWebcamStream.current = audio;
          myScreenStream.current = finalStream;
        } else {
          finalStream = stream;
          myScreenStream.current = finalStream;
        }

        setMyCallScreenOff(false);
        handleMyCallScreen(finalStream);
        myCallStream.current = finalStream;
        setSharingScreen(true);

        //Neu ma chua call
        if (!myMediaConnection.current && !remoteSocketID) {
          console.log("!myMediaConnection.current && !remoteSocketID");
          return;
        }

        //Neu da call roi
        if (created) myPeer.current.call(roomID, finalStream);
        else myPeer.current.call("joiner-" + roomID, finalStream);
      });
  };

  const handleStopShareScreen = () => {
    socket.emit("stop sharing screen", roomID);
    myScreenStream.current?.getTracks().forEach((track) => track.stop());
    myCallTrack.current?.stop();
    if (shareAudio == false && shareCam == false) {
      setSharingScreen(false);
      setMyCallScreenOff(true);
      return;
    }
    navigator.getUserMedia({ video: shareCam, audio: shareAudio }, (stream) => {
      handleMyCallScreen(stream);
      myCallStream.current = stream;
      myWebcamStream.current = stream;

      if (!shareCam) setMyCallScreenOff(true);

      if (!myMediaConnection.current && !remoteSocketID) {
        console.log("!myMediaConnection.current && !remoteSocketID");
        setSharingScreen(false);
        return;
      }

      if (created) myPeer.current.call(roomID, stream);
      else myPeer.current.call("joiner-" + roomID, stream);
      setSharingScreen(false);
    });
  };

  const handleUnShareAudio = () => {
    //Trường hợp đang share screen mà đòi tắt audio thì
    if (sharingScreen) {
      myWebcamStream.current?.getTracks().forEach((track) => {
        if (track.kind != "video") track.stop();
      });
      socket.emit("stop sharing audio", roomID);
      setShareAudio(false);
      return;
    }

    myWebcamStream.current?.getTracks().forEach((track) => {
      if (track != myCallTrack.current) track.stop();
    });
    //Trường hợp tắt audio mà cam cũng đang tắt thì:
    if (shareCam == false && !shareAudio == false) {
      myCallStream.current = null;
      myWebcamStream.current?.getTracks().forEach((track) => track.stop());
      //nếu chưa có ai vào
      if (!myMediaConnection.current && !remoteSocketID) {
        setShareAudio(false);
        return;
      }

      if (created) myPeer.current.call(roomID, null);
      else myPeer.current.call("joiner-" + roomID, null);
      socket.emit("stop sharing audio", roomID);
      setShareAudio(false);
      return;
    }
    navigator.getUserMedia({ video: shareCam, audio: !shareAudio }, (stream) => {
      myCallStream.current = stream;
      stream.getTracks().forEach((track) => myWebcamStream.current?.addTrack(track));
      //nếu chưa có ai vào
      if (!myMediaConnection.current && !remoteSocketID) {
        setShareAudio(false);
        return;
      }

      if (created) myPeer.current.call(roomID, stream);
      if (!created) myPeer.current.call("joiner-" + roomID, stream);
      socket.emit("stop sharing audio", roomID);
      setShareAudio(false);
    });
  };

  const handleShareAudio = async () => {
    if (sharingScreen) {
      if (!myCallTrack.current) return;
      const audio = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      audio.addTrack(myCallTrack.current);

      //Lưu tạm audio vào webcam stream tí hồi clear
      myWebcamStream.current = audio;
      myCallStream.current = audio;

      //nếu chưa có ai vào
      if (!myMediaConnection.current && !remoteSocketID) {
        setShareAudio(true);
        return;
      }

      if (created) myPeer.current.call(roomID, audio);
      if (!created) myPeer.current.call("joiner-" + roomID, audio);
      socket.emit("start sharing audio", roomID);
      setShareAudio(true);
      return;
    }
    navigator.getUserMedia(
      { video: shareCam, audio: !shareAudio },
      (stream) => {
        myCallStream.current = stream;

        myWebcamStream.current?.getTracks().forEach((track) => {
          if (track != myCallTrack.current) track.stop();
        });
        stream.getTracks().forEach((track) => myWebcamStream.current?.addTrack(track));
        //nếu chưa có ai vào
        if (!myMediaConnection.current && !remoteSocketID) {
          setShareAudio(true);
          return;
        }

        if (created) myPeer.current.call(roomID, stream);
        if (!created) myPeer.current.call("joiner-" + roomID, stream);
        // if (created && myCallTrack.current?.enabled) myPeer.current.call(roomID, new MediaStream(myCallTrack.current));
        // if (!created && myCallTrack.current?.enabled) myPeer.current.call("joiner-" + roomID, new MediaStream(myCallTrack.current));
        socket.emit("start sharing audio", roomID);
        setShareAudio(true);
      },
      (err) => {
        socket.emit("stop sharing audio", roomID);
        setShareAudio(false);
      }
    );
    // myVideo.current.muted = false;
  };

  const handleStartWebcam = () => {
    // if (!myMediaConnection.current && !remoteSocketID) return;
    if (sharingScreen) return;
    myWebcamStream.current?.getTracks().forEach((track) => track.stop());
    navigator.getUserMedia(
      { video: { width: 1280, height: 720 }, audio: shareAudio },
      (stream) => {
        handleMyCallScreen(stream);
        myCallStream.current = stream;
        myWebcamStream.current = stream;
        myCallTrack.current = stream.getTracks().filter((track) => track.kind == "video")[0];
        setShareCam(true);
        setMyCallScreenOff(false);

        // Nếu chưa có ai vào
        if (!myMediaConnection.current && !remoteSocketID && !remoteSocketID) {
          console.log("Lọt vào đây");
          return;
        }

        //Nếu là người tạo phòng và đã có người vào thì đưa stream mới có video cho người đó
        if (created) myPeer.current.call(roomID, stream);
        else myPeer.current.call("joiner-" + roomID, stream);

        socket.emit("turn webcam on", roomID);
      },
      (err) => {
        setShareCam(false);
      }
    );
  };

  const handleStopWebcam = () => {
    socket.emit("turn webcam off", roomID);
    myWebcamStream.current?.getTracks().forEach((track) => track.stop());
    myCallTrack.current?.stop();
    if (!shareCam == false && shareAudio == false) {
      //Trường hợp yêu cầu tắt cam nhưng audio cũng đang tắt thì:
      handleMyCallScreen(null);

      //Nếu chưa có ai vào
      if (!myMediaConnection.current && !remoteSocketID) {
        setShareCam(false);
        setMyCallScreenOff(true);
        return;
      }

      if (created) myPeer.current.call(roomID, null);
      else myPeer.current.call("joiner-" + roomID, null);
      setShareCam(false);
      setMyCallScreenOff(true);
      return;
    }

    navigator.getUserMedia({ video: !shareCam, audio: shareAudio }, (stream) => {
      handleMyCallScreen(stream);
      myWebcamStream.current = stream;

      //Nếu chưa có ai vào
      if (myMediaConnection.current == undefined) {
        setShareCam(false);
        setMyCallScreenOff(true);
        return;
      }

      if (created) myPeer.current.call(roomID, stream);
      else myPeer.current.call("joiner-" + roomID, stream);
      setShareCam(false);
      setMyCallScreenOff(true);
    });
    // myWebcamStream.current?.getTracks()[0].enabled = false;
  };

  const handleCreateRoom = () => {
    if (roomID == "") return;
    var peer = new Peer(roomID);
    myPeer.current = peer;

    peer.on("open", (id) => {
      handleAddChatBreak("You have joined room");
      navigator.getUserMedia(
        { video: false, audio: true },
        (stream) => {
          handleMyCallScreen(stream);
          myWebcamStream.current = stream;
          peer.on("disconnected", () => {
            console.log("remote disconnected");
          });

          peer.on("close", () => {
            console.log("remote close");
          });

          peer.on("call", (call) => {
            call.answer(myCallStream.current);
            call.on("stream", (stream) => {
              handleRemoteCallScreen(stream);
              call.on("close", () => {
                console.log("close call");
              });
            });
            myMediaConnection.current = call;
            //Send the remote my current video state
          });

          socket.emit("create room", roomID);
        },
        (err) => {
          setShareAudio(false);
          handleMyCallScreen(null);
          peer.on("disconnected", () => {
            console.log("remote disconnected");
          });

          peer.on("close", () => {
            console.log("remote close");
          });

          peer.on("call", (call) => {
            call.answer(myCallStream.current);
            call.on("stream", (stream) => {
              handleRemoteCallScreen(stream);
              call.on("close", () => {
                console.log("close call");
              });
            });
            myMediaConnection.current = call;
            //Send the remote my current video state
          });

          socket.emit("create room", roomID);
        }
      );
    });
  };

  const handleJoinRoom = (socketID) => {
    myPeer.current = new Peer("joiner-" + roomID); //tạo ID người vào là joiner-[roomID]

    myPeer.current.on("open", (id) => {
      navigator.getUserMedia(
        { video: false, audio: true }, //Phải bật video của người join vào lúc mới vào, mới nhận dc video của người gọi :/ có vẻ là cơ chế của PeerJS hoặc là luật của trình duyệt.
        (myStream) => {
          handleMyCallScreen(myStream);
          myWebcamStream.current = myStream;
          socket.emit("join room", roomID);
          handleAddAlert("Welcome " + socketID + " !!!", "you have joined room");
          setRemoteCallScreenOff(true);
          setRemoteShareAudio(false);
          socket.on("end call", () => {
            myMediaConnection.current?.close();
            myWebcamStream.current?.getTracks().forEach((track) => track.stop());
            setError("host left");
          });
          // myStream.getTracks().forEach((track) => {if (track.kind == 'video') track.stop()});
          // const call = myPeer.current.call(roomID, myStream);

          // call.on("stream", (remoteStream) => {
          //   console.log(remoteStream.getTracks());
          //   handleRemoteCallScreen(remoteStream);
          //   if (remoteStream.getTracks()[remoteStream.getTracks().length - 1].kind == "video") {
          //     setRemoteCallScreenOff(false);
          //   } else {
          //     setRemoteCallScreenOff(true);
          //   }
          // });

          // setRemoteCallScreenOff(true);

          // call.on("close", () => {
          //   console.log("close stream");
          // });
          // myMediaConnection.current = call;
        },
        (err) => {
          setRemoteShareAudio(false);
          handleMyCallScreen(null);
          socket.emit("join room", roomID);
          handleAddAlert("Welcome " + socketID + " !!!", "you have joined room");
          setRemoteCallScreenOff(true);
          socket.on("end call", () => {
            myMediaConnection.current?.close();
            myWebcamStream.current?.getTracks().forEach((track) => track.stop());
            setError("host left");
          });
        }
      );
    });

    // người join room nhận dc sự thay đổi từ người tạo room
    myPeer.current.on("call", (call) => {
      call.answer(myCallStream.current);
      call.on("stream", (stream) => {
        console.log(stream.getTracks());
        handleRemoteCallScreen(stream);
        if (stream.getTracks()[stream.getTracks().length - 1].kind == "video") {
          setRemoteCallScreenOff(false);
          if (stream.getTracks().length != 1) {
            stream.getTracks().forEach((track) => {
              if (track.kind == "audio" && track.enabled) {
                setRemoteShareAudio(true);
                return;
              }
            });
          }
        } else {
          setRemoteCallScreenOff(true);
          setRemoteShareAudio(true);
        }
      });

      call.on("close", () => {
        console.log("close call");
      });

      myMediaConnection.current = call;
    });
  };

  const handleClassChatBox = () => {
    const _classChatBox = classChatBox == "show-chat-box" ? "hide-chat-box" : "show-chat-box";
    const _classChatToogle =
      classChatToogle == "move-out-chat-toogle-button"
        ? "move-in-chat-toogle-button"
        : "move-out-chat-toogle-button";
    setClassChatBox(_classChatBox);
    setClassChatToogle(_classChatToogle);
  };

  const MuteButton = () => {
    return (
      <div
        onClick={handleUnShareAudio}
        className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer mx-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 fill-white"
          viewBox="0 0 384 512"
        >
          <path d="M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z" />
        </svg>
      </div>
    );
  };

  const UnmuteButton = () => {
    return (
      <div
        onClick={handleShareAudio}
        className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer mx-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 fill-white"
          viewBox="0 0 640 512"
        >
          <path d="M383.1 464l-39.1-.0001v-33.77c20.6-2.824 39.98-9.402 57.69-18.72l-43.26-33.91c-14.66 4.65-30.28 7.179-46.68 6.144C245.7 379.6 191.1 317.1 191.1 250.9V247.2L143.1 209.5l.0001 38.61c0 89.65 63.97 169.6 151.1 181.7v34.15l-40 .0001c-17.67 0-31.1 14.33-31.1 31.1C223.1 504.8 231.2 512 239.1 512h159.1c8.838 0 15.1-7.164 15.1-15.1C415.1 478.3 401.7 464 383.1 464zM630.8 469.1l-159.3-124.9c15.37-25.94 24.53-55.91 24.53-88.21V216c0-13.25-10.75-24-23.1-24c-13.25 0-24 10.75-24 24l-.0001 39.1c0 21.12-5.559 40.77-14.77 58.24l-25.72-20.16c5.234-11.68 8.493-24.42 8.493-38.08l-.001-155.1c0-52.57-40.52-98.41-93.07-99.97c-54.37-1.617-98.93 41.95-98.93 95.95l0 54.25L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.839 3.158 5.12 9.189c-8.187 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
        </svg>
      </div>
    );
  };

  const StopShareWebcamButton = () => {
    if (sharingScreen) return <StartShareWebcamButton />;
    return (
      <div
        onClick={handleStopWebcam}
        className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer mx-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="w-8 h-8 fill-white"
        >
          <path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z" />
        </svg>
      </div>
    );
  };

  const StartShareWebcamButton = () => {
    return (
      <div
        onClick={handleStartWebcam}
        className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer mx-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          className="w-8 h-8 fill-white"
        >
          <path d="M32 399.1c0 26.51 21.49 47.1 47.1 47.1h287.1c19.57 0 36.34-11.75 43.81-28.56L32 121.8L32 399.1zM630.8 469.1l-89.21-69.92l15.99 11.02c21.22 14.59 50.41-.2971 50.41-25.8V127.5c0-25.41-29.07-40.37-50.39-25.76l-109.6 75.56l.0001 148.5l-32-25.08l.0001-188.7c0-26.51-21.49-47.1-47.1-47.1H113.9L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.84 3.158 5.121 9.189C-3.066 19.63-1.249 34.72 9.189 42.89l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
        </svg>
      </div>
    );
  };

  const StartShareScreenButton = () => {
    return (
      <div className="text-center">
        <div
          onClick={handleStartShareScreen}
          className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-sky-600 hover:bg-sky-700 hover:cursor-pointer mx-4"
        >
          <svg
            className="w-8 h-8 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M528 0h-480C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h192L224 464H152C138.8 464 128 474.8 128 488S138.8 512 152 512h272c13.25 0 24-10.75 24-24s-10.75-24-24-24H352L336 416h192c26.5 0 48-21.5 48-48v-320C576 21.5 554.5 0 528 0zM512 352H64V64h448V352z" />
          </svg>
        </div>
      </div>
    );
  };

  const StopShareScreenButton = () => {
    return (
      <div className="text-center">
        <button
          onClick={handleStopShareScreen}
          className="animate-pulse w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-sky-600 hover:bg-sky-700 hover:cursor-pointer mx-4"
        >
          <svg
            className="w-8 h-8 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M528 0h-480C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h192L224 464H152C138.8 464 128 474.8 128 488S138.8 512 152 512h272c13.25 0 24-10.75 24-24s-10.75-24-24-24H352L336 416h192c26.5 0 48-21.5 48-48v-320C576 21.5 554.5 0 528 0zM512 352H64V64h448V352z" />
          </svg>
        </button>
      </div>
    );
  };

  const MyCallScreenState = () => {
    if (myCallScreenOff == true)
      return (
        <div className="z-10 absolute top-0 left-0 w-[320px] h-[180px] bg-black object-cover border-2 border-sky-900 text-white flex justify-center items-center text-2xl">
          Your camera is off
          <div className="absolute top-0 left-0 h-6 w-6 m-1 flex justify-center items-center rounded-full bg-black opacity-50">
            {shareAudio ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-white"
                viewBox="0 0 384 512"
              >
                <path d="M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-red-400"
                viewBox="0 0 640 512"
              >
                <path d="M383.1 464l-39.1-.0001v-33.77c20.6-2.824 39.98-9.402 57.69-18.72l-43.26-33.91c-14.66 4.65-30.28 7.179-46.68 6.144C245.7 379.6 191.1 317.1 191.1 250.9V247.2L143.1 209.5l.0001 38.61c0 89.65 63.97 169.6 151.1 181.7v34.15l-40 .0001c-17.67 0-31.1 14.33-31.1 31.1C223.1 504.8 231.2 512 239.1 512h159.1c8.838 0 15.1-7.164 15.1-15.1C415.1 478.3 401.7 464 383.1 464zM630.8 469.1l-159.3-124.9c15.37-25.94 24.53-55.91 24.53-88.21V216c0-13.25-10.75-24-23.1-24c-13.25 0-24 10.75-24 24l-.0001 39.1c0 21.12-5.559 40.77-14.77 58.24l-25.72-20.16c5.234-11.68 8.493-24.42 8.493-38.08l-.001-155.1c0-52.57-40.52-98.41-93.07-99.97c-54.37-1.617-98.93 41.95-98.93 95.95l0 54.25L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.839 3.158 5.12 9.189c-8.187 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
              </svg>
            )}
          </div>
        </div>
      );
    else {
      return (
        <div className="absolute top-0 left-0 h-6 w-6 m-1 flex justify-center items-center rounded-full bg-gray-700 opacity-50">
          {shareAudio ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-white"
              viewBox="0 0 384 512"
            >
              <path d="M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-red-400"
              viewBox="0 0 640 512"
            >
              <path d="M383.1 464l-39.1-.0001v-33.77c20.6-2.824 39.98-9.402 57.69-18.72l-43.26-33.91c-14.66 4.65-30.28 7.179-46.68 6.144C245.7 379.6 191.1 317.1 191.1 250.9V247.2L143.1 209.5l.0001 38.61c0 89.65 63.97 169.6 151.1 181.7v34.15l-40 .0001c-17.67 0-31.1 14.33-31.1 31.1C223.1 504.8 231.2 512 239.1 512h159.1c8.838 0 15.1-7.164 15.1-15.1C415.1 478.3 401.7 464 383.1 464zM630.8 469.1l-159.3-124.9c15.37-25.94 24.53-55.91 24.53-88.21V216c0-13.25-10.75-24-23.1-24c-13.25 0-24 10.75-24 24l-.0001 39.1c0 21.12-5.559 40.77-14.77 58.24l-25.72-20.16c5.234-11.68 8.493-24.42 8.493-38.08l-.001-155.1c0-52.57-40.52-98.41-93.07-99.97c-54.37-1.617-98.93 41.95-98.93 95.95l0 54.25L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.839 3.158 5.12 9.189c-8.187 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
            </svg>
          )}
        </div>
      );
    }
  };

  const RemoteCallScreenState = () => {
    if (remoteCallScreenOff == true)
      return (
        <div className="fixed left-[10vw] top-[2vw] w-[80vw] h-[45vw] bg-black object-cover border-2 border-sky-900 z-10 text-white flex justify-center items-center text-2xl">
          Remote camera is off
          <div className="absolute top-0 left-0 h-6 w-6 m-2 flex justify-center items-center rounded-full bg-gray-700 opacity-50">
            {remoteShareAudio ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-white"
                viewBox="0 0 384 512"
              >
                <path d="M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-red-400"
                viewBox="0 0 640 512"
              >
                <path d="M383.1 464l-39.1-.0001v-33.77c20.6-2.824 39.98-9.402 57.69-18.72l-43.26-33.91c-14.66 4.65-30.28 7.179-46.68 6.144C245.7 379.6 191.1 317.1 191.1 250.9V247.2L143.1 209.5l.0001 38.61c0 89.65 63.97 169.6 151.1 181.7v34.15l-40 .0001c-17.67 0-31.1 14.33-31.1 31.1C223.1 504.8 231.2 512 239.1 512h159.1c8.838 0 15.1-7.164 15.1-15.1C415.1 478.3 401.7 464 383.1 464zM630.8 469.1l-159.3-124.9c15.37-25.94 24.53-55.91 24.53-88.21V216c0-13.25-10.75-24-23.1-24c-13.25 0-24 10.75-24 24l-.0001 39.1c0 21.12-5.559 40.77-14.77 58.24l-25.72-20.16c5.234-11.68 8.493-24.42 8.493-38.08l-.001-155.1c0-52.57-40.52-98.41-93.07-99.97c-54.37-1.617-98.93 41.95-98.93 95.95l0 54.25L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.839 3.158 5.12 9.189c-8.187 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
              </svg>
            )}
          </div>
        </div>
      );
    if (remoteCallScreenOff == null && !created)
      return (
        <div className="fixed left-[10vw] top-[2vw] w-[80vw] h-[45vw] animate-pulse bg-gray-700 text-blue-300 object-cover border-2 border-sky-900 z-10 text-black flex justify-center items-center text-2xl">
          Waiting another user to join...
        </div>
      );
    if (remoteCallScreenOff == null && created) {
      return "";
    }
    if (remoteCallScreenOff == false)
      return (
        <div className="fixed left-[10vw] top-[2vw]">
          <div className="absolute top-0 left-0 h-6 w-6 m-2 flex justify-center items-center rounded-full bg-gray-700 opacity-50">
            {remoteShareAudio ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-white"
                viewBox="0 0 384 512"
              >
                <path d="M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-red-400"
                viewBox="0 0 640 512"
              >
                <path d="M383.1 464l-39.1-.0001v-33.77c20.6-2.824 39.98-9.402 57.69-18.72l-43.26-33.91c-14.66 4.65-30.28 7.179-46.68 6.144C245.7 379.6 191.1 317.1 191.1 250.9V247.2L143.1 209.5l.0001 38.61c0 89.65 63.97 169.6 151.1 181.7v34.15l-40 .0001c-17.67 0-31.1 14.33-31.1 31.1C223.1 504.8 231.2 512 239.1 512h159.1c8.838 0 15.1-7.164 15.1-15.1C415.1 478.3 401.7 464 383.1 464zM630.8 469.1l-159.3-124.9c15.37-25.94 24.53-55.91 24.53-88.21V216c0-13.25-10.75-24-23.1-24c-13.25 0-24 10.75-24 24l-.0001 39.1c0 21.12-5.559 40.77-14.77 58.24l-25.72-20.16c5.234-11.68 8.493-24.42 8.493-38.08l-.001-155.1c0-52.57-40.52-98.41-93.07-99.97c-54.37-1.617-98.93 41.95-98.93 95.95l0 54.25L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.839 3.158 5.12 9.189c-8.187 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
              </svg>
            )}
          </div>
        </div>
      );
  };

  if (error == "404") return <Error />;
  if (error == "host left") return <HostLeft />;

  return (
    <div className="fixed w-full h-screen max-w-full max-h-screen overflow-hidden">
      {loading ? <Loading /> : ""}
      {/* {(error == 'permission micro host')? <ErrorPermissionMicroHost/> : ''} */}
      {/* {(error == 'permission camera host')? <ErrorPermissionCameraHost/> : ''} */}
      {/* {(error == 'permission micro joiner')? <ErrorPermissionMicroJoiner/> : ''} */}
      {/* {(error == 'permission camera joiner')? <ErrorPermissionCameraJoiner/> : ''} */}
      <div
        className="fixed right-4 top-4 z-[1000] max-h-screen max-w-full overflow-auto"
        role="alert"
      >
        {alerts.length
          ? alerts.map((alert, index) => (
              <div
                key={index}
                className="min-w-[350px] max-w-sm bg-sky-100 border-l-4 border-sky-500 text-sky-700 p-4 mb-4 relative"
              >
                <p className="font-bold">{alert.title}</p>
                <span
                  onClick={() => handleDeleteAlert(index)}
                  className="absolute top-0 right-0 px-4 py-3"
                >
                  <svg
                    className="fill-sky-700 h-6 w-6"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
                <p>{alert.content}</p>
              </div>
            ))
          : ""}
      </div>

      <div
        onClick={handleClassChatBox}
        className={`fixed bottom-[330px] flex justify-center items-center w-[40px] h-[60px] bg-sky-900 z-[1001] rounded-r-xl ${classChatToogle} hover:cursor-pointer hover:opacity-80`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          className="w-7 w-7 fill-white"
        >
          <path d="M416 176C416 78.8 322.9 0 208 0S0 78.8 0 176c0 39.57 15.62 75.96 41.67 105.4c-16.39 32.76-39.23 57.32-39.59 57.68c-2.1 2.205-2.67 5.475-1.441 8.354C1.9 350.3 4.602 352 7.66 352c38.35 0 70.76-11.12 95.74-24.04C134.2 343.1 169.8 352 208 352C322.9 352 416 273.2 416 176zM599.6 443.7C624.8 413.9 640 376.6 640 336C640 238.8 554 160 448 160c-.3145 0-.6191 .041-.9336 .043C447.5 165.3 448 170.6 448 176c0 98.62-79.68 181.2-186.1 202.5C282.7 455.1 357.1 512 448 512c33.69 0 65.32-8.008 92.85-21.98C565.2 502 596.1 512 632.3 512c3.059 0 5.76-1.725 7.02-4.605c1.229-2.879 .6582-6.148-1.441-8.354C637.6 498.7 615.9 475.3 599.6 443.7z" />
        </svg>
        {unreadMessages > 0 ? (
          <div className="absolute top-[-6px] right-[-6px] w-4 h-4 rounded-full flex justify-center items-center bg-red-600 text-white"></div>
        ) : (
          ""
        )}
      </div>

      {
        <div
          className={`fixed left-0 bottom-10 h-[350px] bg-gray-900 bg-opacity-70 z-[1000] ${classChatBox} overflow-hidden`}
        >
          {
            <div className="p-4 max-h-[310px] overflow-x-auto">
              {messages.length
                ? messages.map((message, index) => {
                    if (message.type == "chat break")
                      return (
                        <div key={index}>
                          <ChatBreak content={message.content} />
                        </div>
                      );
                    else if (message.from == "me" && message.type == "chat")
                      return (
                        <div key={index}>
                          <MeChat content={message.content} />
                        </div>
                      );
                    else if (message.from == "remote" && message.type == "chat")
                      return (
                        <div key={index}>
                          <RemoteChat content={message.content} />
                        </div>
                      );
                    else if (message.from == "me" && message.type == "output code")
                      return (
                        <div key={index}>
                          <OutputCodeFromMe
                            content={message.content}
                            handleAddCodeFromMe={handleAddCodeFromMe}
                          />
                        </div>
                      );
                    else if (message.from == "remote" && message.type == "output code")
                      return (
                        <div key={index}>
                          <OutputCodeFromRemote
                            content={message.content}
                            handleAddCodeFromMe={handleAddCodeFromMe}
                          />
                        </div>
                      );
                  })
                : ""}
            </div>
          }
          <ChatFooter
            handleAddChatFromMe={handleAddChatFromMe}
            handleAddCodeFromMe={handleAddCodeFromMe}
          />
        </div>
      }
      <div className="bg-black w-full min-h-screen">
        <video
          ref={remoteVideo}
          className="fixed left-[10vw] top-[2vw] w-[80vw] h-[45vw] bg-gray-300 object-cover border-2 border-sky-900"
        ></video>
        <RemoteCallScreenState />
        <Draggable
          bounds={{
            left: -(screen.width - 320),
            top: -(screen.height - 250),
            right: 20,
            bottom: 20,
          }}
        >
          <div className="z-30 absolute bottom-[15px] right-[15px] cursor-move">
            <video
              ref={myVideo}
              className="z-30 w-[320px] h-[180px] border-2 border-blue-900 bg-blue-100 object-cover"
            ></video>
            <MyCallScreenState />
          </div>
        </Draggable>
        <div className="fixed z-40 flex items-center justify-center w-[33.33333vw] left-[33.333333vw] bottom-[20px]">
          {sharingScreen ? <StopShareScreenButton /> : <StartShareScreenButton />}
          {shareAudio ? <MuteButton /> : <UnmuteButton />}
          {shareCam ? <StopShareWebcamButton /> : <StartShareWebcamButton />}
          <div className="text-center">
            <div
              onClick={handleEndCall}
              className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-red-500 hover:bg-red-600 hover:cursor-pointer mx-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="h-7 w-7 fill-white"
              >
                <path d="M271.1 367.5L227.9 313.7c-8.688-10.78-23.69-14.51-36.47-8.974l-108.5 46.51c-13.91 6-21.49 21.19-18.11 35.79l23.25 100.8C91.32 502 103.8 512 118.5 512c107.4 0 206.1-37.46 284.2-99.65l-88.75-69.56C300.6 351.9 286.6 360.3 271.1 367.5zM630.8 469.1l-159.6-125.1c65.03-78.97 104.7-179.5 104.7-289.5c0-14.66-9.969-27.2-24.22-30.45L451 .8125c-14.69-3.406-29.73 4.213-35.82 18.12l-46.52 108.5c-5.438 12.78-1.771 27.67 8.979 36.45l53.82 44.08C419.2 232.1 403.9 256.2 386.2 277.4L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.84 3.158 5.121 9.189c-8.188 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey;
          border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #4195a6;
          border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #2c6696;
        }
      `}</style>
    </div>
  );
}
