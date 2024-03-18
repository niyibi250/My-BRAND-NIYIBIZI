
import { Request,Response } from "express";

import user_model from "../model/user_model";

// get all user-----------------------------------------------------------
const getall_user= async function(req:Request, res:Response)
{
   try{
        const user= await user_model.find({})
        res.status(200).json({user})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}

// create new user -----------------------------------------

const create_user= async function(req:Request, res:Response)
{
   try{
        const user= await user_model.create(req.body)
        res.status(200).json({user})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}

// get single user -----------------------------------------

const get_single_user= async function(req:Request, res:Response)
{
   try{
        const {id:user_id}= req.params
        const user= await user_model.findOne({_id:user_id})
        res.status(200).json({user})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}
// get update user -----------------------------------------

const update_user= async function(req:Request, res:Response)
{
   try{
        const {id:user_id}= req.params
        const user= await user_model.findOne({_id:user_id})
        res.status(200).json({user})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}

// delete user -----------------------------------------

const delete_user= async function(req:Request, res:Response)
{
   try{
        const {id:user_id}= req.params
        const user= await user_model.findOneAndDelete({_id:user_id})
        res.status(200).json({user})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}

export {getall_user, create_user, get_single_user, update_user, delete_user}