 let express=require('express')

 let router=express.Router()

 let {
    getallTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask}=require('../controller/task')

//  --------------------------------------------------//

 router.route('/').get(getallTasks).post(createTask)

 router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



 module.exports=router   