import express from "express";
import Board from "../models/Board.js";
import Task from "../models/Task.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {io} from '../server.js';



const router = express.Router();

router.post("/", authMiddleware , async (req , res) => {
    try {
        const {name} = req.body
        const board = await Board.create({
            name,
            createdBy: req.user.id,
            members: [req.user.id]
        });

       
        res.json(board)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }    
})


router.get("/", authMiddleware , async(req,res)=>{
    try {
        const boards = await Board.find({members: req.user.id});
        res.json(boards)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})


router.post("/:boardId/tasks", authMiddleware , async (req , res) =>{
    try {
        const {title , description , status , assignedTo} = req.body;

        const task = await Task.create({
            title,
            decription,
            status,
            assignedTo,
            board: req.params.boardId
        });

         io.to(req.params.boardId).emit("taskCreated", task);
        res.json(task)
    } catch (error) {
        res.sendStatus(500).json({msg: error.message})
    }
});


router.get("/:boardId/tasks", authMiddleware , async(req , res) =>{
    try {
        const tasks = await Task.find({board: req.params.boardId});
        res.json(tasks)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
});

router.put("/tasks/:taskId", authMiddleware, async(req , res)=>{
   try { const updated = await Task.findByIdAndUpdate(req.params.taskId , req.body, {new : true});

   io.to(updated.board.toString()).emit("taskUpdated", updated);
    res.json(updated);
    }catch(error){
        res.status(500).json({msg: error.message})
    }
});

router.delete("/tasks/:taskId" , authMiddleware , async(req , res)=>{
    try {
        await Task.findByIdAndDelete(req.params.taskId)

         io.to(deleted.board.toString()).emit("taskDeleted", deleted._id);
        res.json({msg : "Task Deleted"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
})





export default router;