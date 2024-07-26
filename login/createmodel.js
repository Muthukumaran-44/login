import mongoose from "../db/db.js"

const storeindata=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        street:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        district:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        zipcode:{
            type:Number,
            required:true,
        },
    },
    image:{
        type:String,
        required:true,
    },
    resume:{
        type:String,
        required:true,
    }
},{
    versionKey:false
})

storeindata.virtual("users").get(function () {
    return this._id.toString();
});

const storemodel=mongoose.model("storedata",storeindata);

export default storemodel