import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Chat,
  ChannelHeader,
  MessageInput,
  MessageList,
  Channel,
  Window
} from "stream-chat-react";
import { StreamChat,  Channel as ChannelType } from "stream-chat"; 
import { STREAM_API_KEY } from "../constants/constants";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState<StreamChat>();
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only if authUser is avaliable
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser?._id,
            name: authUser?.fullName,
            image: authUser?.profilePic,
          },
          tokenData
        );

        const channelID = [authUser._id, targetUserId].sort().join("-");

        const currentChannel = client.channel("messaging", channelID, {
          members: [authUser._id, targetUserId],
        });
        await currentChannel.watch();

        setChatClient(client);
        setChannel(currentChannel);
      } catch (error) {
        console.log("Error inintializing chat: ", error);
        toast.error("Cloud not connect to chat. Please try again");
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, [authUser, tokenData, targetUserId]);

  const handleVideoCall = ()=>{
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call! Join me at ${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    } else {
      toast.error("Channel not found");
    }
  }

  if (loading || !chatClient || !channel) return <ChatLoader />

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall}  />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
