import express from "express";
import {
  adminController,
  authToken,
  contactController,
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
  verifyResetTokenController,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/forgot-password", forgotPasswordController);
router.get("/reset-password/:token", verifyResetTokenController); // reset link verification
router.post("/reset-password", resetPasswordController); // reset password save
router.post("/contact",contactController);  // contact
router.get("/token-verify", authToken); // Verify a user token
router.post("/register-admin" , adminController);

export default router;
