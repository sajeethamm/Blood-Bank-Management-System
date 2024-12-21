import userModel from '../models/userModel.js'; // Import UserModel
import inventoryModel from '../models/inventoryModel.js'; // Import inventoryModel

//GET DONOR LIST
export const getDonorsListController = async (req, res) => {
  try {
    const donorData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: donorData.length,
      message: "Donor List Fetched Successfully",
      donorData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Donor List API",
      error,
    });
  }
};

//GET HOSPITAL LIST
export const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};

//GET ORG LIST
export const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organization" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};


// GET INVENTORY LIST
export const getInventoryListController = async (req, res) => {
  try {
    console.log("Fetching inventory list...");

    const inventoryData = await inventoryModel
      // .find({ $or: [{ inventoryType: "in" }, { inventoryType: "out" }] })

      // .find({ bloodGroup: "A-"})

      .find()
      .sort({ createdAt: -1 });

    console.log("Inventory Data Retrieved:", inventoryData);

    if (inventoryData.length === 0) {
      console.log("No inventory records found.");
    }

    return res.status(200).send({
      success: true,
      totalCount: inventoryData.length,
      message: "Inventory List Fetched Successfully",
      inventoryData, // Ensure this matches your frontend key
    });
  } catch (error) {
    console.error("Error fetching inventory list:", error);

    return res.status(500).send({
      success: false,
      message: "Error In Inventory List API",
      error,
    });
  }
};



// =======================================

//DELETE DONOR
export const deleteDonorController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: " Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};
