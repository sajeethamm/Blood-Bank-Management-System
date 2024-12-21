import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import {getDonorsListController, getHospitalListController, getOrgListController, deleteDonorController, getInventoryListController} from '../controllers/adminController.js';


//router object
const router = express.Router();

//Routes

//GET || DONOR LIST
router.get(
  "/donor-list",
  authMiddleware,
  adminMiddleware,
  getDonorsListController
);

//GET || HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);

//GET || ORG LIST
router.get(
  "/org-list", 
  authMiddleware, 
  adminMiddleware, 
  getOrgListController
  );

// GET || INVENTORY LIST
router.get(
  "/inventory-list", 
  authMiddleware,
  adminMiddleware, 
  getInventoryListController
);

// ==========================

// DELETE DONOR || GET
router.delete(
  "/delete-donor/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonorController
);

// Export the router
export default router;