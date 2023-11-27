  import Budget from "../../model/financeModel/budget.model.js";
import Project from "../../model/financeModel/project.model.js";

const budgetController ={

    getAll: async (req, res) => {
        try {
          const budgets = await Budget.find().populate("project");
          res.json(budgets);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
      getOne: async (req, res) => {
        try {
          const budgets = await Budget.findById(req.params.id).populate("project");
          res.json(budgets);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
      create: async (req, res) => {
        // console.log("===>",req.body);
        try {
          const proj = await Project.findOne({ _id: req.body.project });
          // console.log("===>",proj);
          if (!proj)
            return res
              .status(400)
              .json({ error: true, message: "project doesn't exist" });
          const budgets = new Budget(req.body);
          await budgets.save();
          res.json(budgets);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
      update: async (req, res) => {
        try {
          const budgets = await Budget.findById(req.params.project);
          Object.assign(budgets, req.body);
          await budgets.save();
          res.json(budgets);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
      deleteOne: async (req, res) => {
        try {
          const budgets = await Budget.findById(req.params.project);
          await budgets.remove();
          res.json({ message: "Budget deleted successfully" });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
}

export default budgetController;