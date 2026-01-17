import mongoose from "mongoose";

export const connectDb = async () => {
  const MONGOURL = process.env.MONGOURL;
  try {
    const instance = await mongoose.connect(MONGOURL)
    console.log('MogoDb connected successfully')
  } catch (error) {
    console.log(error)
  }
};
