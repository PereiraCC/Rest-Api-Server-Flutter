import dotenv from 'dotenv';
import Server from './models/server';

// Configuration of dotenv
dotenv.config();

// Instance of Model Server
const server = new Server();

// Calling the express server listener function
server.listen();