
const mangoose= require('mongoose')

const Taskschema = new mangoose.Schema({
    name:{
    type:String,
    required:[true,'must provide name'],
    trim:true},
    completed:{
        type:Boolean,
        default:false,
    }})

const mymodel=mangoose.model('task',Taskschema)

module.exports=mymodel