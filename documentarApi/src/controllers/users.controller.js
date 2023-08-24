import { usersService } from "../services/users.service.js";
import logger from "../utils/logger.js";

export const findAllUsers = async (req, res) => {
  try {
    const users = await usersService.findAll();
    if (users.length) {
      logger.info("Users found:", users);
      res.status(200).json({ message: "Users found", users });
    } else {
      logger.info("No users found");
      res.status(200).json({ message: "No users" });
    }
  } catch (error) {
    logger.error("Error finding users:", error);
    res.status(500).json({ error });
  }
};

export const findOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.findById(id);
    if (user) {
      logger.info("User found:", user);
      res.status(200).json({ message: "User found", user });
    } else {
      logger.info("User not found");
      res.status(400).json({ message: "No user" });
    }
  } catch (error) {
    logger.error("Error finding user:", error);
    res.status(500).json({ error });
  }
};

export const createOneUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Data missing" });
  }
  try {
    const newUser = await usersService.createOne(req.body);
    logger.info("User created:", newUser);
    res.status(200).json({ message: "User created", user: newUser });
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ error });
  }
};
