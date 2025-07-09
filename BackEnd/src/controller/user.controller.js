import AsyncHandler from "../middleware/AsyncHandler.js";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.model.js";
import AppError from "../utils/AppError.js";
import { statusCode } from "../utils/statusCode.js";

/**
 * @route 
 * @access
 * @method 
 */
export const getRecommendedUsers = AsyncHandler(async (req, res, next) => {
  const currentUser = req.user;
  const currentUserID = req.user._id;

  // Friend requests received by current user
  const requestsToMe = await FriendRequest.find({
    recipient: currentUserID,
  }).select("sender");

  // Extract user IDs
  const receivedRequestUserIds = requestsToMe.map((r) => r.sender.toString());

  const recommendedUsers = await User.find({
    _id: {
      $nin: [currentUserID, ...currentUser.friends, ...receivedRequestUserIds],
    },
    isOnboarded: true,
  }).select("fullName profilePic bio nativeLanguage learningLanguage location");

  res.status(200).json({ status: statusCode["200"], data: recommendedUsers });
});


export const getMyFriends = AsyncHandler(
    async (req, res, next) => {
        const currentUserID = req.user._id;
        const user = await User.findById(currentUserID).select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json({ status: statusCode["200"], data: user.friends });
    }
);
    
export const sendFriendRequest = AsyncHandler(
    async (req, res, next) => {
      const myID = req.user._id;
      const { id: recipientId } = req.params;

      //prevent sending request to yourself
      if (myID === recipientId) {
        const err = AppError.create(
          400,
          "You cannot send a friend request to yourself",
          statusCode["400"]
        );
        return next(err);
      }
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        const err = AppError.create(
          404,
          "Recipient not found",
          statusCode["404"]
        );
        return next(err);
      }

      // check if user is already friends
      if (recipient.friends.includes(myID)) {
        const err = AppError.create(
          400,
          "You are already friends with this user",
          statusCode["400"]
        );
        return next(err);
      }
      //check if a request already exists
      const existingRequest = await FriendRequest.findOne({
        $or: [
          { sender: myID, recipient: recipientId  },
          { sender: recipientId, recipient: myID },
        ],
      });
      if (existingRequest) {
        const err = AppError.create(
          400,
          "Friend request already exists",
          statusCode["400"]
        );
        return next(err);
      }

      const friendRequest = await FriendRequest.create({
        sender: myID,
        recipient: recipientId,
      });

      res.status(201).json({
        status: statusCode["201"],
        message: "Friend request sent successfully",
        data: friendRequest,
      });
    }
);
  
export const acceptFriendRequest = AsyncHandler(
    async (req, res, next) => {
      const myID = req.user._id;
      const { id: requestId } = req.params;

      const friendRequest = await FriendRequest.findById(requestId);
      
      if (!friendRequest) {
        const err = AppError.create(
          400,
          "Friend request does not exist",
          statusCode["400"]
        );
        return next(err);
      }

      if (friendRequest.recipient.toString() === myID ) {
         const err = AppError.create(
           403,
           "You are not authorized to accept this request",
           statusCode["403"]
         );
        return next(err);
      }
      friendRequest.status = "accepted";
      await friendRequest.save();
      
      // add each user to each other's friends list
      await User.findOneAndUpdate(
        { _id: friendRequest.sender },
        { $addToSet: { friends: friendRequest.recipient } }
      );
      await User.findOneAndUpdate(
        { _id: friendRequest.recipient },
        { $addToSet: { friends: friendRequest.sender } }
      );
      res.status(200).json({
        status: statusCode["200"],
        message: "Friend request accepted successfully",
      });

    }
  );

export const getFriendRequests = AsyncHandler(
    async (req, res, next) => {
      const currentUserID = req.user._id;
      
      const inComingReqs = await FriendRequest.find({
        recipient: currentUserID,
        status: "pending",
      }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

      const acceptedReqs = await FriendRequest.find({
        sender: currentUserID,
        status: "accepted",
      }).populate(
        "recipient",
        "fullName profilePic"
      );

      res.status(200).json({
        status: statusCode["200"],
        data: {
          inComingReqs,
          acceptedReqs,
        },
      });
    }
  );

export const getOutgoingFriendRequests = AsyncHandler(
    async (req, res, next) => {
      const currentUserID = req.user._id;

      const outgoingingReqsts = await FriendRequest.find({
        sender: currentUserID,
        status: "pending",
      }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

      res.status(200).json({
        status: statusCode["200"],
        data: outgoingingReqsts,
      });  
    }
  );

  export const getFriendRequestsCount = AsyncHandler(
    async (req, res, next) => {
      const currentUserID = req.user._id;
      const inComingReqs = await FriendRequest.countDocuments({
        recipient: currentUserID,
        status: "pending",
      });
      res.status(200).json({
        status: statusCode["200"],
        data: inComingReqs
      }); 
    });