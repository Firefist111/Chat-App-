import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  const hashededPassword = await bcrypt.hash(password, salt);
  return hashededPassword;
};

export const generateToken = (id) => {
  const token = jwt.sign({id} , process.env.JWTSECRET, { expiresIn: "7d" });
  return token;
};
