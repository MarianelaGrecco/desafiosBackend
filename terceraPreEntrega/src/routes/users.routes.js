
import { Router } from 'express'
import { usersModel } from '../persistencia/mongoDB/models/users.model.js'
import { hashData, compareData } from '../utils/bcrypt.js'
import passport, { Passport } from 'passport'
import { findAllUsers, findOneUser, createOneUser } from '../controllers/users.controller.js'

const userRouter = Router()

userRouter.get('/', findAllUsers)
userRouter.get('/:id', findOneUser)
userRouter.post('/', createOneUser)

// persistencia mongo

userRouter.post('/signup', async(req, res) => {
    const { email, password } = req.body
    const user = await usersModel.findOne({email})
    if(user){
      return res.redirect('/api/views/errorSignup')
    }
    const hashPassword = await hashData(password)
    const newUser = {...req.body,password:hashPassword}
    await usersModel.create(newUser)
    res.redirect('/api/views/signup')
  })
  


//   // Login con Passport
userRouter.post(
  '/login',
  passport.authenticate('login', {
    passReqToCallback: true,
    failureRedirect: '/api/views/errorLogin',
    successRedirect: '/api/views/profile',
    failureMessage: '',
  })
) 


userRouter.get('/logout', (req, res) => {
  req.logout(); // Finaliza la sesión del usuario
  res.redirect('/api/views'); // Redirige al home o a la página deseada
});


userRouter.get('/errorLogin', (req, res) => {
  const errorMessage = req.query.errorMessage;
  res.render('errorLogin', { errorMessage });
});

//GitHub
userRouter.get(
  '/githubSignup',
  passport.authenticate('githubSignup', { scope: ['user:email'] })
)

userRouter.get('/github', 
  passport.authenticate('githubSignup', { failureRedirect: '/api/views/home' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/views/profile');
  });

  export default userRouter