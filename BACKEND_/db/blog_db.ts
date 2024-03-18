import { promises } from "dns";
import mongoose from "mongoose";

const connection_string:string='mongodb://localhost:27017/MY_BLAND_DB'

export const connectDB= async function():Promise<void>
{
    await mongoose.connect(connection_string)
}