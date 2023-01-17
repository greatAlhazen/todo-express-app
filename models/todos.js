import mongoose from "mongoose";

const TodosScehama = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc: {
        type:String,
    },
    schedule: {
        type:Date,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

export default mongoose.model('Todos',TodosScehama);