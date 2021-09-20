import { Router } from "express";
import { deleteAgent, getAgentById, getAgents, postAgent, putAgent } from "../controllers/agent";


const router = Router();

router.get(   '/',    getAgents );
router.get(   '/:id', getAgentById );
router.post(  '/',    postAgent );
router.put(   '/:id', putAgent );
router.delete('/:id', deleteAgent );



export default router;