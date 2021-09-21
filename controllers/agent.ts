import { Request, response, Response } from "express";

import db from '../db/config';
import { returnDocsFirebase } from "../helpers/returnDocsFirebase";
import Agent from "../models/agent";

const agentRef = db.collection('agents');

export const getAgents = async (req : Request, res : Response) => {

    try {
        
        const resp = await agentRef.where('status', '==', true).get();

        const documents = returnDocsFirebase(resp);

        return res.status(200).json({
            ok: true,
            total : documents.length,
            documents
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get all agents.'
        });
    }

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
        
        const agent = new Agent(identification, name, lastname, email, phone, true);
        const data = agent.fromJson();

        const doc = await agentRef.add(data);
        // console.log(doc.id);

        res.status(201).json({
            ok: true,
            id_agent : doc.id,
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