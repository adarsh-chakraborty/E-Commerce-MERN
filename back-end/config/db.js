import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (e) {
    console.error(`Error: ${e}`.red.underline.bold);
    process.exit(1); // exit with failure
  }
};

export default connectDB;
