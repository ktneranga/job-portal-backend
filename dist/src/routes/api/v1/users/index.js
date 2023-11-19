"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../../../../controllers/usersController");
const validation_1 = __importDefault(require("../../../../utils/validation"));
const router = express_1.default.Router();
router.get('/get-user', usersController_1.UserController.getUser);
router.get('/get-users', usersController_1.UserController.getUsers);
router.post('/user', validation_1.default.validateUser, usersController_1.UserController.createUser);
exports.default = router;
