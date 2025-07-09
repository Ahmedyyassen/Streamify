import { connect } from "mongoose";
import { MONGODB_URL } from "../constants/env.js";

const connectDB = async()=>{
    try {
        const conn = await connect(MONGODB_URL)
        console.log(`Connected to DB successfully at HOST: ${conn.connection.host}`);
        
    } catch (e) {
        console.log(`Error in connecting to DB ${e}`);
        process.exit(1);
    }
}
export default connectDB;