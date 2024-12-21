import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {  createInventoryController,  getInventoryController,  getDonorsController,  getHospitalController,  getOrgnaizationController,  getOrgnaizationForHospitalController,  getInventoryHospitalController,  getRecentInventoryController  } from '../controllers/inventoryController.js';

const router = express.Router();

// Routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

// GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController);

//GET RECENT BLOOD RECORDS
router.get("/get-recent-inventory", authMiddleware, getRecentInventoryController);

//GET HOSPITAL BLOOD RECORDS
router.post("/get-inventory-hospital", authMiddleware, getInventoryHospitalController);

//GET DONOR RECORDS
router.get("/get-donors", authMiddleware, getDonorsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddleware, getHospitalController);

//GET orgnaization RECORDS
router.get("/get-orgnaization", authMiddleware, getOrgnaizationController);

//GET orgnaization RECORDS
router.get("/get-orgnaization-for-hospital", authMiddleware, getOrgnaizationForHospitalController);

// Export the router
export default router;
