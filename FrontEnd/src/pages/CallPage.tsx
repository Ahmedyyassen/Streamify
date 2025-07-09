import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { STREAM_API_KEY } from "../constants/constants";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";
import CallContent from "../components/CallContent";

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();
  const [isConnecting, setIsConnecting] = useState(true);

  const {authUser, isLoading} = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only if authUser is avaliable
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData || !authUser || !callId) return;
      try {
        console.log("Initializing Stream video client...");
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData,
        });
        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });
        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.log("Error joined call: ", error);
        toast.error("Cloud not join to call. Please try again");
      } finally {
        setIsConnecting(false);
      }
    };
    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />

  return (
    <div className="h-screen flex flex-col items-center justify-center">
       <div className="relative">
        {client && call ? (
          <StreamVideo client={client} >
            <StreamCall call={call} >
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
       </div>
    </div>
  );
}

export default CallPage