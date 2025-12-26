import mongooose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongooose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};
