import express from "express";
import controller from "../controller/controller.js"

const router=express.Router();

router.post("/register",controller.register);
router.post("/login",controller.login);
router.post("/update",controller.update);
router.post("/create",controller.storedata)

router.get("/getall",controller.getalluser);
router.get("/get/:id",controller.getuser);

export default router;