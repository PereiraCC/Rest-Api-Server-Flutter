import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute     from '../routes/auth';
import userRoute     from '../routes/user';
import agentRoute    from '../routes/agent';
import uploadRoute   from '../routes/uploads';
import productsRoute from '../routes/products';


class Server {

    // Property declaration
    private app : Application;
    private port : string;
    private apiPaths = {
        agents   : '/api/agents',
        auth     : '/api/auth',
        products : '/api/products',
        uploads  : '/api/uploads',
        users    : '/api/users',
    };

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8082';

        // Middlewares
        this.middlewares();

        // Set routes
        this.routes();
    }

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
        this.app.use( this.apiPaths.auth,     authRoute     );
        this.app.use( this.apiPaths.agents,   agentRoute    );
        this.app.use( this.apiPaths.users,    userRoute     );
        this.app.use( this.apiPaths.uploads,  uploadRoute   );
        this.app.use( this.apiPaths.products, productsRoute );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }

}

export default Server;