import { Request, Response } from "express";
import mongoose from "mongoose";
var logger = require("../util/logger");
const {encrypt, decrypt} = require('../security/encrypt&decrypt');
const { GetService } = require("../service/getService");
const { PostService } = require("../service/postService");
const { DeleteService } = require("../service/deleteService");
const { PatchService } = require("../service/patchService");
const { GetByIdService } = require("../service/getService");


export class MainController {
  public static async getFunction(req: Request, res: Response) {
    try {
      const users = await new GetService().getUsers();
      if (users) {
        res.json(users);
        logger.accessLog.info("SUCCESS!-USERS-FOUND");
      } else {
        res.status(404).json({ message: "Users not found!" });
        logger.errorLog.info("FAILED!-USERS-NOT-FOUND");
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server error!-GET" });
      logger.errorLog.info("FAILED!-INTERNAL-SERVER-ERROR");
    }
  }
  public static async getUserFunction(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return (
          res.status(400).json({ message: "Invalid user ID format" }),
          logger.errorLog.info("FAILED!-INVALID-USER-ID")
        );
      }
      const result = await new GetByIdService().getUserbyId(userId);
      if (result) {
        res.json(result)
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server error!-GET" });
    }
  
  }
  public static async postFunction(req: Request, res: Response) {
    try {
      const userData = req.body
      const encryptedPassword = encrypt(userData.password)
      userData.password = encryptedPassword.content;
      userData.iv = encryptedPassword.iv;
      const user = await new PostService().postUser(userData);
      if (user) {
        res.json(user);
        logger.accessLog.info("SUCCESS!-USER-POSTED");
      } else {
        res.status(404).json({ message: "User not posted" });
        logger.errorLog.error("FAILED!-USER-NOT-POSTED");
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server error!-POST" });
      logger.errorLog.error("FAILED!-INTERNAL-SERVER-ERROR");
    }
  }
  public static async patchFunction(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const updateData = req.body;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return (
          res.status(400).json({ message: "Invalid user ID format" }),
          logger.errorLog.info("FAILED!-INVALID-USER-ID")
        );
      }

      const result = await new PatchService().patchUserbyId(userId, updateData);

      if (result.matchedCount === 0) {
        return (
          res
            .status(404)
            .json({ message: "User not found or no fields were updated" }),
          logger.errorLog.info("FAILED!-USER-NOT-UPDATED")
        );
      }

      res.status(200).json({ message: "User updated successfully!" }),
        logger.accessLog.info("SUCCESS!-USER-UPDATED");
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error - PATCH" });
      logger.errorLog.info("FAILED!-INTERNAL-SERVER-ERROR");
    }
  }

  public static async deleteFunction(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" }),
        logger.errorLog.info("FAILED!-INVALID-USER-ID");
      }

      const result = await new DeleteService().deleteUserbyId(userId);

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "User not found" }),
        logger.errorLog.info("FAILED!-USER-NOT-FOUND");
      }

      res.status(200).json({ message: "User deleted successfully!" })
      logger.accessLog.info("SUCCESS!-USER-DELETED");
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error - DELETE" }),
      logger.errorLog.info("FAILED!-INTERNAL-SERVER-ERROR");
    }
  }
}
