"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const auth_1 = __importDefault(require("../routes/auth"));
const user_1 = __importDefault(require("../routes/user"));
const agent_1 = __importDefault(require("../routes/agent"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const products_1 = __importDefault(require("../routes/products"));
class Server {
    constructor() {
        this.apiPaths = {
            agents: '/api/agents',
            auth: '/api/auth',
            products: '/api/products',
            uploads: '/api/uploads',
            users: '/api/users',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8082';
        // Middlewares
        this.middlewares();
        // Set routes
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Read of body
        this.app.use(express_1.default.json());
        // Folder public
        this.app.use(express_1.default.static('public'));
        // Fileupload
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        // Set agents route
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.agents, agent_1.default);
        this.app.use(this.apiPaths.users, user_1.default);
        this.app.use(this.apiPaths.uploads, uploads_1.default);
        this.app.use(this.apiPaths.products, products_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map