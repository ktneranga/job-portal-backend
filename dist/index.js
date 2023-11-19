"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const celebrate_1 = require("celebrate");
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app_1.default.use((0, celebrate_1.errors)());
