import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB is connected");
    });
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";
    if (!mongodbURI) {
        throw new Error("MONGODB_URI environment vairable not set")
    }
    if (mongodbURI.endsWith("/")) {
        mongodbURI = mongodbURI.slice(0, -1);
    }
    await mongoose.connect(`${mongodbURI}/${projectName}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectDB;