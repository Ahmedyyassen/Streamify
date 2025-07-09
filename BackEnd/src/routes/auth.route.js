import { loginCtrl, logoutCtrl, signupCtrl,onboardingCtrl } from '../controller/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { Router } from'express'
const router = Router();

router.route("/signup").post(signupCtrl)
router.route("/login").post(loginCtrl)
router.route("/logout").post(logoutCtrl);

router.post("/onboarding",protectedRoute, onboardingCtrl);

//check if user is authenticated
router.get("/me", protectedRoute, (req, res) => {
    res.status(200)
      .json({ status: true, message: "User is authenticated",user:req.user});
});

// forget password
// reset password

export default router;