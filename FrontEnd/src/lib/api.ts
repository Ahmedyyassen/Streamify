import { FRIENDS, FRIENDS_ACCEPT, FRIENDS_REQUEST, FRIENDS_REQUESTS, FRIENDS_REQUESTS_COUNT, GET_TOKEN, LOGIN, LOGOUT, ME, ONBOARDING, OUT_GOING_FRIEND_REQUESTS, SIGNUP, USER } from "../constants/constants";
import type { LOGINMODEL, ONBOARINGFORM, SIGNUPMODEL } from "../interface/auth";
import type { Friend, GETFRIENTREQUEST, OUTGOINGREQUESTS, User } from "../interface/user";
import { request } from "./axios";

 export const signupFn = async(signupData: SIGNUPMODEL)=>{
      const res = await request.post(SIGNUP, signupData);
      return res.data;
    }

export const getAuthUser = async () => {
      try {
      const res = await request.get(ME);
      return res.data.user;
      } catch (error) {
      console.log("Error in get auth user", error);
      return null
      }
}

export const completeOnboading = async (onboardingData: ONBOARINGFORM) => {
      const res = await request.post(ONBOARDING, onboardingData);
      return res.data;
}
export const loginFn = async (loginData: LOGINMODEL) => {
      const res = await request.post(LOGIN, loginData);
      return res.data;
}

export const logoutFn = async()=>{
      const res = await request.post(LOGOUT);
      return res.data;
}

export const getUserFriends = async (): Promise<Friend[]> => {
  const res = await request.get(FRIENDS);
  return res.data.data;
};

export const getRecommendedUsers = async(): Promise<User[]>=>{
      const res = await request.get(USER);      
      return res.data.data;  
}

export const getOutgoingFriendRequests = async ():Promise<OUTGOINGREQUESTS[]> => {
  const res = await request.get(OUT_GOING_FRIEND_REQUESTS);
  console.log(res.data.data);
  
  return res.data.data;
};

export const sendFriendRequest = async (userId: string) => {      
  const res = await request.post(FRIENDS_REQUEST(userId));  
  return res.data
};

export const getFriendsRequestsFn = async ():Promise<GETFRIENTREQUEST> => {      
  const res = await request.get(FRIENDS_REQUESTS);  
  return res.data.data
};
export const friendsRequestCount = async ():Promise<number> => {      
  const res = await request.get(FRIENDS_REQUESTS_COUNT);    
  return res.data.data
};
export const acceptFriendReqFn = async (userId: string) => {      
  const res = await request.put(FRIENDS_ACCEPT(userId));  
  return res.data
};

export const getStreamToken = async () => {
  const res = await request.get(GET_TOKEN);
  return res.data.token;
};