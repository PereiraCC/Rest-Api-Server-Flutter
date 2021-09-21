import { Request, Response } from "express";

import db from '../db/config';
import Agent from "../models/agent";

const agentRef = db.collection('agents');

export const getAgents = (req : Request, res : Response) => {

    res.json({
        msg: 'get agents'
    });

}

export const getAgentById = (req : Request, res : Response) => {

    const { id } = req.params;

    res.json({
        msg: 'get agents by id',
        id
    });

}

export const postAgent = async (req : Request, res : Response) => {

    const { identification, name, lastname, email, phone } = req.body;

    try {
        
        const agent = new Agent(identification, name, lastname, email, phone);
        const data = agent.fromJson();

        await agentRef.add(data);
        
        res.status(201).json({
            ok: true,
            data
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
           msg: 'Error when creating an agent.'
        });
    }
}

export const putAgent = (req : Request, res : Response) => {

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'put an agent by id',
        id, 
        body
    });

}

export const deleteAgent = (req : Request, res : Response) => {

    const { id } = req.params;

    res.json({
        msg: 'delete an agent by id',
        id
    });

}