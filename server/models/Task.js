import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title : {type: String , required: true},
        decription : {type: String  },
        status : {type: String , default: "todo"},
        board: {type: mongoose.Schema.Types.ObjectId, ref:"Board"},
        assignedTo : {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }, {timestamps: true}
);

export default mongoose.model("Task" , taskSchema)