import {messageService} from "../services/message.service.js" 

export const saveMessage = async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await messageService.create({ user, message });
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al guardar el mensaje" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await messageService.find();
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los mensajes" });
  }
};

