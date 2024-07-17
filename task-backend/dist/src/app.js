"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, database_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    console.log('Welcome to Task 141');
    res.send("Welcome to Task 141");
});
app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.listen(process.env.PORT, () => {
    console.log(`App Running on http://localhost:${process.env.PORT}`);
});
