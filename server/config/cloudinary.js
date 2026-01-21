import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME = "dk3qmlhm3",
  api_key: process.envCLOUDINARY_API_KEY = "787844984462681",
  api_secret: process.envCLOUDINARY_API_SECRET = "sn4LKJJhYQXVEwL3OU0p0qktbFw",
});


export default cloudinary