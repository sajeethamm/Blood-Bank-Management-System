import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { bloodGroupDetailsContoller} from '../controllers/analyticsController.js';

const router = express.Router();

//routes

//GET BLOOD DATA
router.get("/bloodGroups-data", authMiddleware, bloodGroupDetailsContoller);

// Export the router
export default router;