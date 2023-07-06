
import { Router } from 'express'
import { usersModel } from '../models/Users.js'
import { hashData, compareData } from '../path.js'
import passport from 'passport'

const userRouter = Router()

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
  
//login sin passport 
  // userRouter.post('/login',async (req,res)=>{
  //   const {email, password} = req.body
  //   const user = await usersModel.findOne({email})
  //   if(!user){
  //     return res.redirect('/api/views/errorLogin')
  //   }
  //   const isPasswordValid = await compareData(password,user.password)
  //   if(!isPasswordValid){
  //     return res.status(400).json({message:'Email or password not valid'})
  //   }
  //   req.session.user = user
  //   //req.session.email = email
  //   //req.session.password = password 
  //   res.redirect('/api/views/profile')
  // })

  
userRouter.post(
  '/login',
  passport.authenticate('login', {
    passReqToCallback: true,
    failureRedirect: '/api/views/errorLogin',
    successRedirect: '/api/views/profile',
    failureMessage: '',
  })
) 

userRouter.get('/logout', (req,res)=> {
  req.session.destroy(error=>{
    if(error){
      console.log(error);
      res.send(error);
    }else {
      res.redirect('/api/views')
    }
  })
})

userRouter.get('/errorLogin', (req, res) => {
  const errorMessage = req.session.errorMessage;
  // Elimina el mensaje de error 
  delete req.session.errorMessage;
  res.render('errorLogin', { errorMessage });
});

//GitHub
userRouter.get(
  '/githubSignup',
  passport.authenticate('githubSignup', { scope: ['user:email'] })
)

userRouter.get('/github', 
  passport.authenticate('githubSignup', { failureRedirect: '/api/views' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/views/profile');
  });

  export default userRouter