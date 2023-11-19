"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonResponse = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class CommonResponse {
    constructor() {
        this.status = false;
        this.code = 500;
        this.data = null; //any js data type can be stored in the Object data type
        this.error = null;
        this.message = '';
    }
    setStatus(status) {
        this.status = status;
    }
    setCode(code) {
        this.code = code;
    }
    setData(data) {
        this.data = data;
    }
    setMessage(message) {
        this.message = message;
    }
    setError(error) {
        this.error = error;
    }
    getCode() {
        return this.code;
    }
    getStatus() {
        return this.status;
    }
    getMessage() {
        return this.message;
    }
    getData() {
        return this.data;
    }
    getError() {
        return this.error;
    }
    getResponse() {
        return {
            status: this.getStatus(),
            message: this.getMessage(),
            data: this.getData(),
            errorStack: process.env.NODE_ENV === 'development' ? this.getError() : null,
        };
    }
}
exports.CommonResponse = CommonResponse;
