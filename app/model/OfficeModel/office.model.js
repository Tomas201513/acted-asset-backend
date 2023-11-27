import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
  officeLocation: {
    type: String,
    required: true,
  },
  officeAreaName: {
    type: String,
    required: true,
  },  
  officeSubAreaName: {
    type: String,
    required: true,
  },
  officePhone: {
    type: String,
    required: true,
  }
});

const Office = mongoose.model("Office", OfficeSchema);

export default Office;


