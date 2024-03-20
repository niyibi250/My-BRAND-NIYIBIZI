 import express,{ Request, Response} from "express"
  
 import blog_model from '../model/blog_model'

 import {update_blog_data_varidation,create_blog_data_varidation} from '../post_data_varidation/admin_post_data_varidation'

 //  for getting the blog---------------------------

 const getall_blog= async function (_req:Request, res:Response)
 {
    try{

        const blog=await blog_model.find({})
        res.status(200).json({blog})
    }
    catch(error){
        res.status(404).json({msg:error})
    };
 }

 //  for creating the blog---------------------------

 const create_blog= async function(req:Request, res:Response)
 {
     try{
         const varidate=create_blog_data_varidation(req.body)
         if(varidate.error)
         {
            return res.status(404).json({msg:'the varidation did not go throught', varidate})
         }
         
        const blog_data= req.body
         const blog=await blog_model.create(blog_data)
         res.status(200).json(blog_data)
     }
     catch(error){
         res.status(404).json({msg:"provide name for blog"})
     };
 }

 //get single blog ---------------------------------
 
 const get_single_blog= async function(req:Request, res:Response)
{
    try{

        const {id:blog_id}= req.params
        const blog=await blog_model.findOne({_id:blog_id})
        res.status(200).json(blog)
    }
    catch(error){
        res.status(404).json({msg:"provide name for blog"})
    };
}

//  for updating the blog---------------------------

const update_blog= async function(req:Request, res:Response)
{
    try{

        const varidate=update_blog_data_varidation(req.body)
        if(varidate.error)
        {
           return res.status(404).json({msg:'the varidation did not go throught', varidate})
        }

        const {id:blog_id}= req.params
        const blog=await blog_model.findOneAndUpdate({_id:blog_id},req.body,{new:true})
        res.status(200).json(blog)
    }
    catch(error){
        res.status(404).json({msg:"provide name for blog"})
    };
}

//  for deleting the blog---------------------------

const delete_blog= async function(req:Request, res:Response)
{
    try{

        const {id:blog_id}= req.params
        const blog=await blog_model.findOneAndDelete({_id:blog_id})
        res.status(200).json(blog)
    }
    catch(error){
        res.status(404).json({msg:"provide name for blog"})
    };
}

export {getall_blog, create_blog,get_single_blog, update_blog,delete_blog}