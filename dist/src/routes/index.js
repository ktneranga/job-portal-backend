"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const users_1 = __importDefault(require("./api/v1/users"));
const auth_1 = __importDefault(require("./api/v1/auth"));
class Routes {
    routes(app) {
        app.get('/health', (req, res) => res.status(200).send('Healthy!!!'));
        app.use('/api/v1', users_1.default);
        app.use('/api/v1', auth_1.default);
    }
}
exports.Routes = Routes;
