import express from "express";

import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", authController.login);
router.get("/authCheck", authController.authCheck);
router.get("/logout", authController.logout);

export default router;
