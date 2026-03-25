import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
import { seedDefaultCategories } from "./seed/defaultCategories";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // run seed
  await seedDefaultCategories();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();