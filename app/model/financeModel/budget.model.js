import mongoose from "mongoose";
import Project from "./project.model.js";

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: Project,
        required: true,
    },
    budgetAmount: {
        type: Number,
        required: true,
    },
    budgetCode: {
        type: String,
        required: true,
    },
    budgetName: {
        type: String,
        required: true,
    },



    budgetDescription: {
        type: String,
        required: true,
    },
    budgetStatus: {
        type: String,
        enum: ["active", "inactive"],
        required: true,
    },
    budgetType: {
        type: String,
        // required: true,
    },
    budgetStartDate: {
        // type: Date,
        type: String,
        // required: true,
    },
    budgetEndDate: {
        // type: Date,
        type: String,
        // required: true,
    }
    
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
