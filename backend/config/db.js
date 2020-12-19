import mongoose from "mongoose";

// Async Connection to handle promises
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      // For console warnings
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${con.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
