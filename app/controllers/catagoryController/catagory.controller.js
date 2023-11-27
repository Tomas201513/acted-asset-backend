import Category from "../../model/CatagoryModel/category.model.js";

const categoryController = {
    getAll: async (req, res) => {
        try {
        const categories = await Category.find();
        res.json(categories);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
        const category = await Category.findById(req.params.id);
        res.json(category);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        const category = new Category({
        catagory: req.body.catagory,
        });
        try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
        const category = await Category.findById(req.params.id);
        if (req.body.catagory) {
            category.catagory = req.body.catagory;
        }
        const updatedCategory = await category.save();
        res.json(updatedCategory);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    },
    deleteOne: async (req, res) => {
        try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted Category" });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    };

export default categoryController;
