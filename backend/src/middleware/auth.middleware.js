import { requireAuth } from "@clerk/express";

import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId();
      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized" });
        ``;
      }

      const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(500).json({ message: "Internal Error" });
    }
  },
];

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized user not found" });
  }

  // Convert allowed admin emails (comma separated) into an array
  const adminEmails = ENV.ADMIN_EMAILS.split(",").map((e) => e.trim());

  if (!adminEmails.includes(req.user.email)) {
    return res.status(403).json({ message: "TMC Forbidden Admin Only" });
  }

  next();
};
