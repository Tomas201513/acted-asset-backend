import SubCatagory from "../../model/CatagoryModel/subCatagory.model.js";
import Catagory from "../../model/CatagoryModel/category.model.js";

const subCatagoryController = {
    getAll: async (req, res) => {
        try {
        const subCatagory = await SubCatagory.find().populate("catagory");
        res.json(subCatagory);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
        const subCatagory = await SubCatagory.findById(req.params.id).populate(
            "catagory"
        );
        res.json(subCatagory);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        // console.log("===>",req.body);
        try {
        const cat = await Catagory.findOne({ _id: req.body.catagory });
        // console.log("===>",cat);
        if (!cat)
            return res
            .status(400)
            .json({ error: true, message: "catagory doesn't exist" });
        const subCatagory = new SubCatagory(req.body);
        await subCatagory.save();
        res.json(subCatagory);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
        const subCatagory = await SubCatagory.findById(req.params.id);
        Object.assign(subCatagory, req.body);
        await subCatagory.save();
        res.json(subCatagory);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    deleteOne: async (req, res) => {
        try {
        await SubCatagory.findByIdAndDelete(req.params.id);
        res.json({ message: "SubCatagory deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    };

export default subCatagoryController;