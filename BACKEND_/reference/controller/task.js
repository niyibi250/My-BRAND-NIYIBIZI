const Task =require('../models/task')


const getallTasks= async function(req,res)
{
   try{
     
    let tasks= await Task.find({})
    res.status(200).json(tasks)
   } catch(error){
      res.status(500).json({msg:error})
   }
}
// -----------------------------------

const createTask= async function(req,res)
{
   try{
        const task= await Task.create(req.body)
        res.status(201).json(await Task.find({}))
     } 
     catch(error){
        res.status(500).json({msg:error})
     }
}
// -----------------------------------

const getTask= async function(req,res)
{
    try{
       
       const {id:task_id}=req.params
       const task= await Task.findOne({name:task_id})
       res.status(200).json({mytask:task})

    } catch(error){
        res.status(500).json({error})
    }
   
}
// -----------------------------------

const updateTask= async function(req,res)
{
    try{
         const {id:task_id}=req.params
         const task= await Task.findOneAndUpdate({name:task_id},req.body,{
            new:true,
            runValidators:true,
         })
         
         if(!task)
         {
            return res.status(404).json({msg:'no file fund'})
         }
         else{
            res.status(200).json({task})
         }
    } catch(error){
         res.status(500).json({msg:error})
    }
}
// -----------------------------------

const deleteTask= async function(req, res)
{
    try{
        const {id:task_id}=req.params
        const task=await Task.findOneAndDelete({name:task_id})
        if(!task)
        {
            return res.status(404).json({msg:`no such name in database ${task_id}`})
        }
        else{
            res.status(201).json({task})
        }
    } catch(error){
         res.status(404).json({msg:error})
    }
}

module.exports={
    getallTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}