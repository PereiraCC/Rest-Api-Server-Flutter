"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const agent_1 = __importDefault(require("../routes/agent"));
class Server {
    constructor() {
        this.apiPaths = {
            agents: '/api/agents'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8082';
        // connection to the database
        // this.dbConnection();
        // Middlewares
        this.middlewares();
        // Set routes
        this.routes();
    }
    // async dbConnection() {
    //     try {
    //         // await db.authenticate();
    //         // console.log('Database online')
    //     } catch (error : any ) {
    //         throw new Error( error );
    //     }
    // }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Read of body
        this.app.use(express_1.default.json());
        // Folder public
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.agents, agent_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map