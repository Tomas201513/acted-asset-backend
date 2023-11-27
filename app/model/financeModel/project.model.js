import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    donorName: {
    type: String,
    required: true, 
    },
    donorCode: {
    type: String,
    required: true,
    },
    projectName: {
    type: String,
    required: true,
    },
    projectCode: {
        type: String,
        required: true,
    },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;