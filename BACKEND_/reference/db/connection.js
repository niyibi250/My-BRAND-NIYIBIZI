
const mongoose = require('mongoose')

const connection_string='mongodb://localhost:27017/task_manager'

const connectDB= function(url)
{
    return mongoose.connect(connection_string)
} 

module.exports=connectDB