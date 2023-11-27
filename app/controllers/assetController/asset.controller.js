import Asset from "../../model/AssetModel/asset.model.js";
import Budget from "../../model/financeModel/budget.model.js";
import SubCatagory from "../../model/CatagoryModel/subCatagory.model.js";
import User from "../../model/UserModel/user.model.js";

const assetController = {
    getAll: async (req, res) => {
        try {
        const assets = await Asset.find().populate([{
            path: 'subCatagory',
            populate: {
                path:'catagory'   
              }
            
         }, {
            path: 'budget',
            populate: {
                path:'project'
              }
          }, {
            path: 'registeringOfficer'
          }, {
            path: 'currentUser',
            populate: {
                path:'position',
                // path:'office',
              }
          },{
            path: 'currentUser',
            populate: {
                // path:'position',
                path:'office',
              }
          }]);
        res.json(assets);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
        const assets = await Asset.findById(req.params.id).populate(["subCatagory" , "budget" , "registeringOfficer", "currentUser"]);
        res.json(assets);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        // console.log("===>",req.body);
        try {
        const subCatagory = await SubCatagory.findById(req.body.subCatagory);
        const budget = await Budget.findById(req.body.budget).populate("project");
        const registeringOfficer = await User.findById(req.body.registeringOfficer);
        // console.log("===>",proj);
        if (!subCatagory)
            return res
            .status(400)
            .json({ error: true, message: "subCatagory doesn't exist" });
        if (!budget)
            return res
            .status(400)
            .json({ error: true, message: "budget doesn't exist" });    
        if (!registeringOfficer)
            return res
            .status(400)
            .json({ error: true, message: "registeringOfficer doesn't exist" });
        
            // Find existing assets with the exact match of projectCode, budgetCode, and code
        const existingAssets = await Asset.find({
            'probudcat': `${budget.project.projectCode}-${budget.budgetCode}-${subCatagory.code}`
        });
        console.log("existingAssets",existingAssets.length);

        const assets = new Asset(req.body);
        assets.probudcat = `${budget.project.projectCode}-${budget.budgetCode}-${subCatagory.code}`;
        assets.item_count = existingAssets.length+1;
        assets.tag = `${budget.project.projectCode}-${budget.budgetCode}-${subCatagory.code}-${existingAssets.length+1}`;
        await assets.save();
        res.json(assets);
        } catch (error) {   
        res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const subCatagory = await SubCatagory.findById(req.body.subCatagory);
            const budget = await Budget.findById(req.body.budget);
            const registeringOfficer = await User.findById(req.body.registeringOfficer);
            
            if (!subCatagory)
                return res
                .status(400)
                .json({ error: true, message: "subCatagory doesn't exist" });
            if (!budget)
                return res
                .status(400)
                .json({ error: true, message: "budget doesn't exist" });
            if (!registeringOfficer)
                return res
                .status(400)
                .json({ error: true, message: "registeringOfficer doesn't exist" });
            const assets = await Asset.findById(req.params.id);
            Object.assign(assets, req.body);
            await assets.save();
            res.json(assets);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },

    deleteOne: async (req, res) => {
        try {
        const assets = await Asset.findByIdAndDelete(req.params.id);
        res.json(assets);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    };
    

export default assetController;



        