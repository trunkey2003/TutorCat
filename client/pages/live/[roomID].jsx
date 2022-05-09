import dynamic from "next/dynamic";
const LiveRoomCSR = dynamic(() => import("../../components/LiveRoom"), { ssr: false }); //Không tồn tại đối tượng navigator bên server
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LiveRoom() {
  
  const route = useRouter();
  useEffect(() => {
  }, [route]);

  return <>{route.query.roomID ? <LiveRoomCSR roomID={route.query.roomID} created={route.query.created} /> : ""}</>;
}
