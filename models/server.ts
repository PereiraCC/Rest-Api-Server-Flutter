import express, { Application } from 'express';
import cors from 'cors';

// import userRoutes from '../routes/usuarios';
// import db from '../db/connection';

class Server {

    private app : Application;
    private port : string;
    private apiPaths = {
        usuarios: '/api/agents'
    };

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8082';

        // Conexion a la base de datos
        // this.dbConnection();

        // Middlewares
        // this.middlewares();

        // Definir mis rutas
        // this.routes();
    }

    async dbConnection() {

        try {
            
            // await db.authenticate();
            // console.log('Database online')

        } catch (error : any ) {
            throw new Error( error );
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );
    }

    routes() {
        // this.app.use( this.apiPaths.usuarios, userRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }

}

export default Server;