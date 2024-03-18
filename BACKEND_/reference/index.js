 let express=require('express')
 const app=express()

 const tasks=require('./routes/task')

 const connectDB=require('./db/connection')

// middleware
app.use(express.static('public'))
app.use(express.json())



//  routes

app.use('/api/v1/tasks', tasks)

// app.get('/api/v1/tasks')   get all th task
// app.post('/api/v1/tasks')  create  new task
// app.get('/api/v1/tasks:id') create single task
// app.patch('/api/v1/tasks:id') update task
// app.delete('/api/v1/tasks:id') delete task
 const PORT=3000

 const start=async function()
 {
    try{
    await connectDB()
    app.listen(PORT,function(){
        console.log(`The server is listerning on Port ${PORT}.......... `)
    })}
    catch(error){
        console.log(error)
    }
 }

 start( )
