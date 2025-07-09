import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controller/chat.controller.js";


const router = Router();

router.get("/token", protectedRoute, getStreamToken)

export default router;
