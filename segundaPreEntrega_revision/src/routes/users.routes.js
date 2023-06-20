
import { Router } from 'express'
import { usersModel } from '../models/Users.js'
import { hashData, compareData } from '../path.js'

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
  
  userRouter.post('/login',async (req,res)=>{
    const {email, password} = req.body
    const user = await usersModel.findOne({email})
    if(!user){
      return res.redirect('/api/views/errorLogin')
    }
    const isPasswordValid = await compareData(password,user.password)
    if(!isPasswordValid){
      return res.status(400).json({message:'Email or password not valid'})
    }
    req.session.user = user
    //req.session.email = email
    //req.session.password = password
    res.redirect('/api/views/profile')
  })
  export default userRouter