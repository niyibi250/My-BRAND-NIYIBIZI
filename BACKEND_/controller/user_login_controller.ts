//-----------imports--------------------------------------//

import express,{ Response,Request } from "express";

import jwt from 'jsonwebtoken'

import user_model from '../model/user_model'

//-----------verfie if user exist--------------------------//

const verf_user= async function(req:Request, res:Response)
{
   try{
        const {username, password}= req.body

        const user= await user_model.findOne({username:username, password:password})
        if(!user)
        {
            return res.status(404).json({msg:'user not found'})
        }

        const token=jwt.sign({user_id:user._id, username:user.username, email:user.email},'eric1234')
        
        res.status(200).json({token})
    }
    catch(error){
        res.status(404).json({msg:'Did not go through',error})
    }
}

//----------create new user-------------------------------//

const create_user= async function(req:Request, res:Response)
{
   try{
        const user= await user_model.create(req.body)
        res.status(200).json({user})
   }
   catch(error)
   {
    res.status(404).json({msg:"message user not created"})
   }
}

//----------export controller----------------------------//

export {verf_user,create_user}  