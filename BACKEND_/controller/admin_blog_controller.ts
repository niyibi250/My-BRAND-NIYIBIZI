 import express,{ Request, Response} from "express"
  
 import blog_model from '../model/blog_model'

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

        const {id:blog_id}= req.params
        const blog=await blog_model.findOneAndUpdate({_id:blog_id})
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