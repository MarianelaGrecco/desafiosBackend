import { messageService } from "../services/message.service.js";

export const saveMessage = async (req, res) => {
  const { user, message } = req.body;

  try {
    const newMessage = await messageService.saveMessage(user, message);
    res.status(201).json({ message: "Message saved", newMessage });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findAllMessages = async (req, res) => {
  try {
    const messages = await messageService.findAllMessages();
    res.status(200).json({ message: "Messages found", messages });
  } catch (error) {
    res.status(500).json({ error });
  }
};
