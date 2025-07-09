import { AVATAR_API_URL } from "../constants/env.js";

const ind = Math.floor(Math.random() * 100) + 1;
const randomAvatar = `${AVATAR_API_URL}${ind}`;

export default randomAvatar;