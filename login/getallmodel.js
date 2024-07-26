import mongoose from "../db/db.js";

const userdetails=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
},{
    versionkey:false,
})

userdetails.virtual("users").get(function () {
    return this._id.toString();
});
const userdetModel = mongoose.model("getalll models", userdetails);

export default userdetModel