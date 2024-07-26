import userModel from "../model/model.js"
import updatemodel from "../model/updatemodel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config";
import multer from "multer";
import createmodel from "../model/createmodel.js"
import { model } from "mongoose";
import details  from "../model/model.js";



const service = {

    register: async (data) => {
      console.log("data", data);
      
      const { username,email,phone_number,password} = data;
  
      try {
        const hashedpassword=await bcrypt.hash(password,10);
        console.log("hashed password is",hashedpassword);
        
        const existingUser = await details.findOne({
          email,
        });
  
        // console.log(existingUser);
        if (existingUser) {
          throw {
            error: "User with this email already exists.",
          };
        }
        const newUser = await details.create({
          username,
          email,
          phone_number,
          password:hashedpassword
        });
        console.log("ps", newUser);
        return newUser;
      } catch (error) {
        console.error("Error registering user:", error);
        throw error;
      }
    },
//=======================================================================================
    login:async(data)=>{
      try{
        const {email,password}=data;

        const user=await details.findOne({
          email,
        });
        if(!user){
          throw new Error("user not found");
        }
        const passmatch=await bcrypt.compare(password,user.password);
         if(!passmatch){
          throw new Error("invalid password");
         }
         const token = jwt.sign(
          {
            user_id: user._id,
          },
          process.env.JWT_SECRET_KEY
        );
  
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
  
        return {
          token,
          user: userWithoutPassword,
        };
      }catch (error) {
        console.error("Error during login:", error);
        throw {
          error: "user not found",
        };
      }
    },
//=======================================================================================
    update:async(data)=>{
      const{
        user_id,
        name,
        address,
        phonenumber,
        profileimg,
        resume
      }=data;
      console.log(data,"k");
      try{
        const updatedata = await updatemodel.findByIdAndUpdate(
          user_id,{
            name,
            address,
            phonenumber,
            profileimg,
            resume
          },
          {
            new:true,
          }
        );
        console.log(updatedata,"jjj");
        return updatedata;
      }
      catch(error){
        throw error;
      }
    },

    //+++++++++++++++++++++++++++++++++++++++++++==============================

    storedata:async(data)=>{
      const{
        name,
        phone_number,
        email,
        address,
        image,
        resume,
      }=data;
      try{
        
        console.log("data",data);
        const existingUser = await createmodel.findOne({
          email,
        });
  
        //console.log(existingUser,"jjyy");
        if (existingUser) {
          throw {
            error: "User with this email already exists.",
          };
        }
        const createdata = await createmodel.create({
            name,
            phone_number,
            email,
            address,
            image,
            resume,
      });
      console.log(createdata);
        return createdata;
      }
      catch(error){
        console.log(error);
        throw error;
      } 
    },

    //=======================================================

    getalluser:async()=>{
      try{
        const userdetails = await details.find()
        return userdetails;
      }
      catch(error){
        throw error;
      }
    },
    //---------------------------------------------------------
    getuser: async (user_id) => {
      try {
        const getuserid = await details.findById(user_id);
        return getuserid;
      } catch (error) {
        throw error;
      }
    },
  

}

export default service;