import mongoose from "../db/db.js";

const user=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    password: {
        type: String,
        required: true
      },

},
{versionKey:false});

user.virtual('user_id').get(function () {
    return this._id.toString();
});

const details = mongoose.model('users', user)

export default details