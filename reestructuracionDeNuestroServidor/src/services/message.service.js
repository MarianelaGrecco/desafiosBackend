import messageModel from "../persistencia/DAOs/MongoDAOs/message.model.js";

class MessageService {
  async saveMessage(user, message) {
    try {
      const newMessage = await messageModel.create({ user, message });
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async findAllMessages() {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (error) {
      throw error;
    }
  }
}

export const messageService = new MessageService();
;