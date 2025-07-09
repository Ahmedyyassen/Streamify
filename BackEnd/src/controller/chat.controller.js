import { generateStreamToken } from "../lib/stream.js";
import AsyncHandler from "../middleware/AsyncHandler.js";


export const getStreamToken = AsyncHandler(
    async (req, res, next) => {
        const token = generateStreamToken(req.user._id);

        res.status(200).json({
          success: true,
          message: "Stream Token Generated Successfully",
          token,
        });
    }
)