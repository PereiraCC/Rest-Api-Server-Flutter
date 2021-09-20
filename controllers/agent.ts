import { Request, Response } from "express";

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

export const postAgent = (req : Request, res : Response) => {

    const { body } = req;

    res.json({
        msg: 'post an agent',
        body
    });

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