import mongoose from "mongoose";

const contact_schema=new mongoose.Schema({
    email:{type:String, required:true},
    username:{type:String, required:true},
    message:{type:String, required:true}
})

const contact_model= mongoose.model('contact',contact_schema)

export default contact_model 