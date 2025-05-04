import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  checkUser,
} from "../controller/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-tokens").post(refreshAccessToken);
router.route("/check-user").get(verifyJWT, checkUser);

export default router;
