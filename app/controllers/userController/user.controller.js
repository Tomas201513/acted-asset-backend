import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
	logInBodyValidation,
	signUpBodyValidation,
	refreshTokenBodyValidation
} from "../../utils/validationSchema.util.js"
import User from '../../model/UserModel/user.model.js';

export const getUsers = async (req, res) => {
  console.log('controller');
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: '$roles',
          count: { $sum: 1 },
        },
      },
    ]);

    const userCountsPromises = users.map(async (user) => {
      const userData = await User.findOne({ roles: user._id }).lean();
      return {
        roleName: userData.roles[0],
        count: user.count,
      };
    });

    const userCounts = await Promise.all(userCountsPromises);


    const usersdata = await User.find().populate(['office', 'position']);
    res.status(200).json({ usersdata, userCounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {


  const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(400)
				.json({ error: true, message: "User with given email already exist" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = await new User({ ...req.body, password: hashPassword }).save();

		res
			.status(201)
			.json( { message: "User created successfully", newUser });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
}

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

    