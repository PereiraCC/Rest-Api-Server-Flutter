import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import agentRoutes from '../routes/agent';
import uploadRoutes from '../routes/uploads';


class Server {

    // Property declaration
    private app : Application;
    private port : string;
    private apiPaths = {
        agents: '/api/agents',
        uploads: '/api/uploads'
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

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }

    routes() {
        // Set agents route
        this.app.use( this.apiPaths.agents,  agentRoutes );
        this.app.use( this.apiPaths.uploads, uploadRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }

}

export default Server;