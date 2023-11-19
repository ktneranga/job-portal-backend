"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JWT {
    constructor() {
        this.secret = process.env.JWT_SECRET;
    }
    assignToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn: process.env.TOKEN_EXPIRESIN });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
}
exports.default = new JWT();
