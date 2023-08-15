import { Router } from 'express';
import { usersModel } from '../persistencia/mongoDB/models/users.model.js';
import { hashData, compareData } from '../utils/bcrypt.js';
import passport from 'passport';
import logger from '../utils/logger.js';
import { isAdmin, isUser, applyPolicy } from '../authorizationMiddlewere.js';

const userRouter = Router();

// Agregar logger a los métodos existentes
userRouter.get('/', applyPolicy(['admin']), async (req, res) => {
  try {
    // ... Código existente para encontrar todos los usuarios ...
    logger.info('All users fetched successfully:', users);
    res.status(200).send(users);
  } catch (error) {
    logger.error('Error fetching all users:', error);
    res.status(400).send(error);
  }
});

userRouter.get('/:id', applyPolicy(['user']), async (req, res) => {
  try {
    // ... Código existente para encontrar un usuario por ID ...
    if (user) {
      logger.info('User found:', user);
      res.status(200).send(user);
    } else {
      logger.warn('User not found with ID:', req.params.id);
      res.status(404).send('User not found');
    }
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(400).send(error);
  }
});

userRouter.post('/', async (req, res) => {
  try {
    // ... Código existente para crear un nuevo usuario ...
    logger.info('New user created successfully:', newUser);
    res.send(newUser);
  } catch (error) {
    logger.error('Error creating user:', error);
    res.status(400).send(error);
  }
});

// persistencia mongo
userRouter.post('/signup', async (req, res) => {
  try {
    // ... Código existente para registrar un nuevo usuario ...
    logger.info('New user signed up successfully:', newUser);
    res.redirect('/api/views/signup');
  } catch (error) {
    logger.error('Error signing up user:', error);
    res.redirect('/api/views/errorSignup');
  }
});

//   // Login con Passport
userRouter.post(
  '/login',
  passport.authenticate('login', {
    passReqToCallback: true,
    failureRedirect: '/api/views/errorLogin',
    successRedirect: '/api/views/profile',
    failureMessage: '',
  })
);

userRouter.put("/premium/:uid", isAdmin, async (req, res) => {
  const { uid } = req.params;
  
  try {
    const user = await usersModel.findById(uid);
    if (!user) {
      logger.warn("User not found:", uid);
      return res.status(404).json({ message: "User not found" });
    }

    // Cambiar el rol del usuario
    user.role = user.role === "user" ? "premium" : "user";
    await user.save();

    logger.info("User role changed:", user);
    res.status(200).json({ message: "User role changed", user });
  } catch (error) {
    logger.error("Error changing user role:", error);
    res.status(500).json({ error });
  }
});



export default userRouter;
