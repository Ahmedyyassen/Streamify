import { StreamChat } from "stream-chat";
import { STREAM_API_KEY, STREAM_API_SECRET } from "../constants/env.js";

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
    console.error("Stream API key or secret is missing");  
}
const streamClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);
 
export const upsertStreamUser = async (userData)=>{
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error while upserting user: ", error);        
    }
}
// TODO: do it later
export const generateStreamToken = (userId) => {
    try {
        const token =  streamClient.createToken(userId.toString());
        return token;
    } catch (error) {
        console.error("Error while generating token: ", error);
    }
}