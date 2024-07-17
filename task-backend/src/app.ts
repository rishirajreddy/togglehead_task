import express from "express"
import dbConnection from "./database";
import router from "./routes";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();
dbConnection()
const app = express();

app.use(express.json())
app.use(cors({ origin: "*" }));
app.use("/api", router)
app.get("/", (req, res) => {
    console.log('Welcome to Task 141');
    res.send("Welcome to Task 141")
})

app.use("/public", express.static(path.join(process.cwd(), "public")));

app.listen(process.env.PORT, () => {
    console.log(`App Running on http://localhost:${process.env.PORT}`)
})