import { Request,Response} from "express"

import contact_model from "../model/contact_model"

// get all contact message -----------------------------------------

const getall_contact= async function(req:Request, res:Response)
{
   try{
        const contact= await contact_model.find({})
        res.status(200).json({contact})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}

// create contact message -----------------------------------------

const create_contact= async function(req:Request, res:Response)
{
   try{
        const contact= await contact_model.create(req.body)
        res.status(200).json({contact})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}

// get single contact message -----------------------------------------

const get_single_contact= async function(req:Request, res:Response)
{
   try{
        const {id:contact_id}= req.params
        const contact= await contact_model.findOne({_id:contact_id})
        res.status(200).json({contact})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}

// delete contact message -----------------------------------------

const delete_contact= async function(req:Request, res:Response)
{
   try{
        const {id:contact_id}= req.params
        const contact= await contact_model.findOneAndDelete({_id:contact_id})
        res.status(200).json({contact})
   }
   catch(error)
   {
    res.status(404).json({error})
   }
}

export {getall_contact,create_contact, get_single_contact, delete_contact}