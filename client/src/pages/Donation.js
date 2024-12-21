import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/shared/Layout/Layout.js";
import API from "../services/API.js";
import { useSelector } from "react-redux";
import "../styles/Donation.css"; // Ensure you have the correct path to your CSS file

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Memoize the getDonors function
  const getDonors = useCallback(async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          donor: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?._id]);

  useEffect(() => {
    getDonors();
  }, [getDonors]);

  // Function to get the class name based on blood group
  const getBloodGroupClass = (bloodGroup) => {
    switch (bloodGroup) {
      case "A+":
        return "blood-group-A-positive";
      case "A-":
        return "blood-group-A-negative";
      case "B+":
        return "blood-group-B-positive";
      case "B-":
        return "blood-group-B-negative";
      case "AB+":
        return "blood-group-AB-positive";
      case "AB-":
        return "blood-group-AB-negative";
      case "O+":
        return "blood-group-O-positive";
      case "O-":
        return "blood-group-O-negative";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="mb-4" style={{ textAlign: "center" }}>Donation Records</h2>
        <div className="row">
          {data?.map((record) => (
            <div className="col-md-6 col-lg-4 mb-4" key={record._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <span className={`highlight-blood-group ${getBloodGroupClass(record.bloodGroup)}`}>
                      {record.bloodGroup}
                    </span> 
                  </h5>
                  <p className="card-text">
                    <strong>Quantity :</strong> {record.quantity} ml
                  </p>
                  <p className="card-text">
                    <strong>Email :</strong> {record.email}
                  </p>
                  <p className="card-text">
                    <strong>Date :</strong> {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Donation;
