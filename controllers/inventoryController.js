import mongoose from 'mongoose';
import inventoryModel from '../models/inventoryModel.js';
import userModel from '../models/userModel.js';

// CREATE INVENTORY
export const createInventoryController = async (req, res) => {
  try {
        const {email} = req.body;

    //validation
    const user = await userModel.findOne({email});
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (req.body.inventoryType === "in" && user.role !== "donor") {
    //   throw new Error("Not a Donor Account");
    // }
    // if (req.body.inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a Hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    }

   // Save Record
        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
          success: true,
          message: "New Blood Record Added",
        });
     
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get Consumer Inventory",
      error,
    });
  }
};

/// GET ALL BLOOD RECORDS
export const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel.find({
        organization: req.body.userId,    // or use req.query.userId if passed as a query parameter
      })
      .populate("donor") 
      .populate("hospital") 
      .sort({ createdAt: -1 });
    
    return res.status(200).send({
      success: true,
      message: "Get all Records Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Inventory",
      error,
    });
  }
};

// GET Hospital BLOOD RECORS
export const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "Get Hospital Consumer Records Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get Consumer Inventory",
      error,
    });
  }
};

// GET BLOOD RECORD OF 3
export const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// GET DONOR REOCRDS
export const getDonorsController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //find donars
    const donorId = await inventoryModel.distinct("donor", {
      organization,
    });
    // console.log(donorId);
    const donors = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donor Record Fetched Successfully",
      donors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donor records",
      error,
    });
  }
};

export const getHospitalController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });
    //FIND HOSPITAL
    const hospitals = await userModel.find({_id: { $in: hospitalId }});
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

// GET OrganizationPROFILES
export const getOrgnaizationController = async (req, res) => {
  try {
    const donor = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { donor });
    //find Organization
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Organization Data Fetched Successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Organization API",
      error,
    });
  }
};

// GET Organization for Hospital
export const getOrgnaizationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { hospital });
    //find Organization
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Organization Data Fetched Successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};
