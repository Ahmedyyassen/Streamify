export const SERVER_HOST =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_SERVER_HOST
    : "/api";


const AUTH = `${SERVER_HOST}/auth`;
const CHAT = `${SERVER_HOST}/chat`;
export const USER = `${SERVER_HOST}/users`;

export const SIGNUP = `${AUTH}/signup`;
export const LOGIN = `${AUTH}/login`;
export const LOGOUT = `${AUTH}/logout`;
export const ONBOARDING = `${AUTH}/onboarding`;
export const ME = `${AUTH}/me`;

export const GET_TOKEN = `${CHAT}/token`;

export const FRIENDS = `${USER}/friends`;
export const FRIENDS_REQUESTS = `${USER}/friend-requests`;
export const FRIENDS_REQUESTS_COUNT = `${FRIENDS_REQUESTS}/count`;

export const OUT_GOING_FRIEND_REQUESTS = `${USER}/outgoing-friend-requests`;
export const FRIENDS_REQUEST =(id:string)=> `${USER}/friend-request/${id}`;
export const FRIENDS_ACCEPT =(id:string)=> `${USER}/friend-request/${id}/accept`;

export const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;