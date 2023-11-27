import mongoose from "mongoose";
import Office from "../OfficeModel/office.model.js";
import Department from "../DepartmentModel/department.model.js";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  office: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    required: false,
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: "Position",
    required: false,
  },
  roles: {
    type: [String],
    enum: ["admin","superAdmin", "staff","nonStaff"], // "user
    default: ["staff"],
    // required: false,
 
  },
});

const User = mongoose.model("User", userSchema);

export default User;
