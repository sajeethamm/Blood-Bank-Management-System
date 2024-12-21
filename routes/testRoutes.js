// testRoutes.js
import express from 'express';
import { testController } from '../controllers/testController.js';

//router object
const router = express.Router();

//routes
router.get("/", testController);

//export
export default router;
