import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest,getOutgoingFriendRequests ,getFriendRequests, getMyFriends, getRecommendedUsers, sendFriendRequest, getFriendRequestsCount } from "../controller/user.controller.js";


const router = Router();

router.use(protectedRoute)

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);

router.put("/friend-request/:id/accept", acceptFriendRequest);

// reject friend request

router.get("/friend-requests", getFriendRequests);
router.get("/friend-requests/count", getFriendRequestsCount)

router.get("/outgoing-friend-requests", getOutgoingFriendRequests);



export default router;