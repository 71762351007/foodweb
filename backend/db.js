const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// Update the database name to the one you are using in MongoDB Atlas
const mongoURI = "mongodb+srv://arunkumarnataraj2001:arun02@N@cluster0.3cyis.mongodb.net/";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log("Connected to MongoDB Successfully");

        // Fetch collections after successful connection
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("food_categories").find({}).toArray();

        // Store globally if necessary
        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

        console.log("Data fetched and stored in global variables");

    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

module.exports = mongoDB;
