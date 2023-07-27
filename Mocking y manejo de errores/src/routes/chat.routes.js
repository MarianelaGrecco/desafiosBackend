import { Router } from "express";
import { saveMessage, getMessages } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/save-message", saveMessage);
chatRouter.get("/messages", getMessages);

export default chatRouter;
