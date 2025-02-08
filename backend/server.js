import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import gameRoutes from "./routes/game.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/games", gameRoutes);


app.listen(port, () => {
    connectDB();
    console.log("Server started at http://localhost:" + port);
})