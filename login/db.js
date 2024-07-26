import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/kumaran")
    .then(()=>{
        console.log("db is connected")
    })
    .catch((err)=>{
        console.log(err);
    })

export default mongoose;

