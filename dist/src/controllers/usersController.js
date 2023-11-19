"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const usersService_1 = __importDefault(require("../services/usersService"));
class UserController {
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const data = yield usersService_1.default.getUser(id);
            res.status(data.code).json(data.getResponse());
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield usersService_1.default.getUsers();
            res.status(data.code).json(data.getResponse());
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const data = yield usersService_1.default.createUser(body);
            res.status(data.code).json(data.getResponse());
        });
    }
}
exports.UserController = UserController;
