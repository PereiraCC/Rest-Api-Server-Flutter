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

export const getAgentById = async (req : Request, res : Response) => {

    const { id } = req.params;

    try {
        
        const resp = await agentRef.where('status', '==', true)
                                   .where('identification','==', id).get();

        if( resp.docs.length == 0 ){
            return res.status(404).json({
                msg: 'Agent with that ID not found in the database.'
            });
        }

        const documents = returnDocsFirebase(resp);

        return res.status(200).json({
            ok: true,
            documents
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get an agent.'
        });
    }
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

export const putAgent = async (req : Request, res : Response) => {

    const { id } = req.params;
    const { ...data } = req.body;

    try {
        
        let docRef = await getAgent(id);

        data.identification = docRef?.data().identification;
        data.status = true;

        await agentRef.doc(docRef?.id).update(data);

        docRef = await getAgent(id);

        res.json({
            ok: true,
            id_agent : docRef?.id,
            agent : docRef?.data()
        });
       
    } catch (error) {
       console.log(error);
       return res.status(400).json({
          msg: 'Error when updating an agent.'
       }); 
    }
}

export const deleteAgent = (req : Request, res : Response) => {

    const { id } = req.params;

    res.json({
        msg: 'delete an agent by id',
        id
    });

}

const getAgent = async (id : String) => {

    const resp = await agentRef.where('status', '==', true)
                                   .where('identification','==', id).get();

    const docRef = resp.docs.find((doc) => {
        if(doc.data().identification === id){
            return doc;
        }
    });

    return docRef;

}