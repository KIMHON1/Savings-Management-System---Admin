import User from '../models/Admin.js';

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

export { getProfile };