import { usersService } from "../services/users.service.js";

export const findAllUsers = async (req, res) => {
    try {
      const users = await findAll()
      if (users.length) {
        res.status(200).json({ message: 'Users found', users })
      } else {
        res.status(200).json({ message: 'No users' })
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  }
  
  export const findOneUser = async (req, res) => {
    const { id } = req.params
    try {
      const user = await findById(id)
      if (user) {
        res.status(200).json({ message: 'User found', user })
      } else {
        res.status(400).json({ message: 'No user' })
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  }
  
  export const createOneUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'Data missing' })
    }
    try {
      const newUser = await createOne(req.body)
      res.status(200).json({ message: 'User create', user: newUser })
    } catch (error) {
      res.status(500).json({ error })
    }
  }