import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        console.log('Mongo URI:', process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // const conn = await mongoose.connect('mongodb://hungzx234:hungzx234@localhost:27017');
        console.log(`MonggoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connection to mongoDB:${error.message} `);
        process.exit(1);
    }
}

export default connectMongoDB;