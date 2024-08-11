import express from "express";

const router = express.Router();
import { MainController } from "../controller/mainController";
import { RequestValidator } from "../validator/RequestValidator";

router.get("/users/", MainController.getFunction);
router.get("/users/:userId/", MainController.getUserFunction);
router.post("/users/", RequestValidator.postUser, MainController.postFunction);
router.delete("/users/:userId", MainController.deleteFunction);
router.patch("/users/:userId", RequestValidator.patchUser, MainController.patchFunction);

export default router;
