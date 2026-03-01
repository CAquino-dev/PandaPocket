import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes"
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes)
app.use("/api/category", categoryRoutes)


app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

export default app;