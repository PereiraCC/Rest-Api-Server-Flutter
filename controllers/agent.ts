import { Request, Response } from "express";

// Import db configuration, model and helpers
import db from '../db/config';
import Agent from "../models/agent";
import { returnDocsFirebase } from "../helpers/returnDocsFirebase";

// Reference to collection of agents in firebase
const agentRef = db.collection('agents');

export const getAgents = async (req : Request, res : Response) => {

    try {

        const { userID } = req.params;
        const { limit = 10, from = 1 } = req.query;

        // Get all data to the limit
        const data = await agentRef
            .orderBy('identification')
            .limit(from as number)
            .where('userID', '==', userID).get();

        // Verification if docs
        if(from as number > data.docs.length || data.docs.length == 0) {
            return res.status(200).json({
                ok: true,
                total : 0,
                documents: []
            });
        }

        // Get data with filters
        const resp = await agentRef
            .orderBy('identification')
            .limit(limit as number)
            .startAt(data.docs[from as number - 1])
            .where('status', '==', true)
            .where('userID', '==', userID).get();

        // Send data
        return res.status(200).json({
            ok: true,
            total : resp.docs.length,
            documents : returnDocsFirebase(resp)
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get all agents.'
        });
    }

}

export const getAgentById = async (req : Request, res : Response) => {

    // Get ID param 
    const { id, userID } = req.params;

    try {
        
        // Get all agents with status true and id equal
        const resp = await agentRef.where('status', '==', true)
                                   .where('identification','==', id)
                                   .where('userID', '==', userID).get();

        // Verification if there are documents
        if( resp.docs.length == 0 ){
            return res.status(404).json({
                msg: 'Agent with that ID not found in the database.'
            });
        }

        // Processing collection data
        const documents = returnDocsFirebase(resp);

        // Send data
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

    // Get data form JSON
    const { identification, name, lastname, email, phone, userID } = req.body;

    try {
        
        // Create new instance of agent class and get JSON
        const agent = new Agent(identification, name, lastname, email,phone, userID , true);
        const data = agent.fromJson();

        // Add new agent in the database
        const doc = await agentRef.add(data);

        // Send data
        res.status(201).json({
            ok: true,
            uid : doc.id,
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

    // Get id param and data
    const { userID, id } = req.params;
    const { ...data } = req.body;

    try {
        
        // Obtain the identification document
        let docRef = await getAgent(id, userID);

        // Verification if there is an agent
        if(!docRef?.exists){
            return res.status(400).json({
                msg: 'Error The identification is not already in the database'
            }); 
        }

        // Fields: identification and status 
        data.identification = docRef?.data().identification;
        data.status = true;
        data.userID = docRef?.data().userID;

        // Update the document with new data
        await agentRef.doc(docRef?.id).update(data);

        // Obtain the new data
        docRef = await getAgent(id, userID);

        // Send data
        res.json({
            ok: true,
            uid : docRef?.id,
            agent : docRef?.data()
        });
       
    } catch (error) {
       console.log(error);
       return res.status(400).json({
          msg: 'Error when updating an agent.'
       }); 
    }
}

export const deleteAgent = async (req : Request, res : Response) => {

    // Get id param
    const { userID, id } = req.params;

    try {

        // Obtain the identification document
        let docRef = await getAgent(id, userID);

        // Verification if there is an agent
        if(!docRef?.exists){
            return res.status(400).json({
                msg: 'Error The identification is not already in the database'
            }); 
        }

        // Update the documento with status in false
        await agentRef.doc(docRef?.id).update({
            status : false
        });

        // Obtain new data 
        docRef = await getAgent(id, userID, false);

        // Send data
        res.json({
            ok: true,
            uid : docRef?.id,
            agent : docRef?.data()
        });

    } catch (error) {
       console.log(error);
       return res.status(400).json({
          msg: 'Error when deleting an agent.'
       });
    }
}

export const getAgent = async (id : string, userID : string, status = true) => {

    // Obtain all agents with status true / false (param) and id equal
    const resp = await agentRef.where('status', '==', status)
                                   .where('identification','==', id)
                                   .where('userID', '==', userID).get();

    // From the list obtain documento with id equal
    const docRef = resp.docs.find((doc) => {
        if(doc.data().identification === id){
            return doc;
        }
    });

    return docRef;

}