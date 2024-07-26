import mongoose from "mongoose";

const user = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        zipcode:{
            type: Number,
            required: true
        },
    },
    phone_number: {
        type: Number,
        required: true
    },
    profileimg:{
        type: String,
        required: true
    },
    resume: {
        type:String,
        required:true
    },
}, {
    versionKey: false
})

user.virtual('users').get(function () {
    return this._id.toString();
});

const updatefile = mongoose.model("updatemodel", user);

export default updatefile