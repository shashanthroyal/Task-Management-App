import mongoose, { mongo } from "mongoose";

const columnSchema = new mongoose.Schema({
    name: {type: String , required : true},
    board: {type: mongoose.Schema.Types.ObjectId, ref: "Board"}
});

export default mongoose.model("Column" , columnSchema)