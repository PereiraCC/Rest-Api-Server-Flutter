import express, { Application } from 'express';
import cors from 'cors';

import agentRoutes from '../routes/agent';

class Server {

    // Property declaration
    private app : Application;
    private port : string;
    private apiPaths = {
        agents: '/api/agents'
    };

    constructor() {
        this.app  = express();
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
        this.app.use( cors() );

        // Read of body
        this.app.use( express.json() );

        // Folder public
        this.app.use( express.static('public') );
    }

    routes() {
        // Set agents route
        this.app.use( this.apiPaths.agents, agentRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }

}

export default Server;