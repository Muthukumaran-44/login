import { MulterError } from "multer";
import service from "../service/service.js"

const controller={

    register:async(req,res,next)=>{
        //const { username,email,phone_number,password} = req.body;
        console.log(req.body);
        try{
            const registerresult= await service.register(req.body);
            res.json({
                message: "Successfully registered",
                data: registerresult,
            });
        }catch (error) {
            error.message=error.error;
            error.statuscode=400;
            console.log(error);
            next(error);
        }
    },
    login:async(req,res,next)=>{
        //const email=req.body;
        //const password=req.body;
        try{
            const loginResult= await service.login(req.body);
            res.json({
                message: " login successs",
                data: loginResult,
            });
        }
        catch(error){
            error.message=error.error;
            error.statuscode=400;
            console.log(error);
            next(error);
        }
    },
//=======================================================================================
    update:async(req,res,next)=>{
        try{
            const updateresult=await service.update(req.body);
            res.status(200).json({
                mesaage:"update successfully",
                data:updateresult,
            })

        }
        catch(error){
            error.message=error.error;
            error.statuscode=400;
            next(error);
        }
    },
    //+=============================================================+

    storedata:async(req,res,next)=>{
        try{
            const storeresult=await service.storedata(req.body);
            console.log(storeresult,"smm");
            res.status(200).json({
                message:"create succesfully",
                data:storeresult
            });
        }
        catch(error){
            error.message=error.error;
            error.statuscode=500;
            next(error);
        }
    },

    //+++++++======================+++++++++++++=

    getalluser:async(req,res,next)=>{
        try{
            const getallmethod= await service.getalluser();
            res.status(200).json(getallmethod);
        }
        catch(error){
            error.mesaage=error.error;
            error.statuscode=500;
            next(error);    
        }
    },
    //----------------------------------------------
    getuser:async(req,res,next)=>{
        const user_id = req.params.id
        try {
            const getuser = await service.getuser(user_id);
            res.json(getuser)
        } catch (error) {
            error.message = error.error;
            console.log(error);
            error.statuscode = 500;
            next(error);
        }
    }

}

export default controller;