import User from "../models/User.js";


export const getUserProfile = async (req, res) => {

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountCreationDate: user.accountCreationDate,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
