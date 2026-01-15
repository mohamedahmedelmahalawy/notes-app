import mongoose from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URL;

let isConnected = false;
async function dbConnect() {
  if (!MONGODB_URI) throw Error("No DB");

  if (isConnected) {
    console.log("Already connected to Mongodb");
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Conneced to Mongodb", db);
  } catch (error) {
    console.error("Faild to connect", error);
    throw error;
  }
}

export default dbConnect;
