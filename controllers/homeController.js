import mongoose from 'mongoose';
import userModel from '../models/userModel.js'; // Import UserModel
import inventoryModel from '../models/inventoryModel.js'; // Import inventoryModel


// GET TOTAL BLOOD DATA
export const getTotalBloodController = async (req, res) => {
  try {
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    const bloodGroupData = [];

    // Define blood groups
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // Total blood donated (in)
        const totalIn = await inventoryModel.aggregate([
          { $match: { organization, bloodGroup } },
          { $group: { _id: null, total: { $sum: '$quantity' } } }
        ]);

        // Total blood used (out)
        const totalOut = await inventoryModel.aggregate([
          { $match: { organization, bloodGroup } },
          { $group: { _id: null, total: { $sum: '$quantity' } } }
        ]);

        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
        });
      })
    );

    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetch Successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
  }
};

// GET TOTAL NUMBER OF DONORS
export const getTotalDonorsController = async (req, res) => {
    try {
      const donorCount = await userModel.countDocuments({ role: 'donor' });
  
      return res.status(200).send({
        success: true,
        totalDonors: donorCount,
        message: 'Total Number of Donors Fetched Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: 'Error In Donor Count API',
        error,
      });
    }
  };
