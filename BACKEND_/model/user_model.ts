
import mongoose from "mongoose";

const user_scheme= new mongoose.Schema({
    email:{type:String, required:true},
    username:{type:String,required:true},
    password:{default:'12345', type:String}
})

const user_model= mongoose.model('user',user_scheme)

export default user_model