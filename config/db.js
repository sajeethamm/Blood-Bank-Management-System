import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB Database: ${mongoose.connection.host}/${mongoose.connection.name}`.bgMagenta.white);
        // process.exit(0); // Exit process with success
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`.bgRed.white);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
