import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";

import { useEffect, type FC } from "react";

const CallContent: FC = () => {

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/chat");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};


export default CallContent;
