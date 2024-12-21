import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout.js";
import Spinner from "../../components/shared/Spinner.js";
import moment from "moment";
import API from "../../services/API.js";
import "../../styles/InventoryList.css"; // Ensure you have the correct path to your CSS file

const InventoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch the inventory data
  const getInventory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/inventory-list");
      console.log("API Response:", response.data); // Log to inspect the response
      if (response.data?.success) {
        setData(response.data.inventoryData); // Ensure this matches the response key
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  // Function to determine the CSS class for each blood group
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

  // Function to determine card color based on Inventory Type
  const getCardColor = (inventoryType) => {
    switch (inventoryType) {
      case "in":
        return "card-green";
      case "out":
        return "card-red";
      default:
        return "";
    }
  };

  // Function to get the most recent 3 records for Inventory In
  const getRecentInventoryIn = () => {
    return data.filter((record) => record.inventoryType === "in").slice(0, 3);
  };

  // Function to get the most recent 3 records for Inventory Out
  const getRecentInventoryOut = () => {
    return data.filter((record) => record.inventoryType === "out").slice(0, 3);
  };

  // Calculate summary for each blood group
  const calculateSummary = () => {
    const summary = {};

    data.forEach((record) => {
      if (!summary[record.bloodGroup]) {
        summary[record.bloodGroup] = {
          totalIn: 0,
          totalOut: 0,
          balance: 0,
        };
      }

      if (record.inventoryType === "in") {
        summary[record.bloodGroup].totalIn += record.quantity;
      } else if (record.inventoryType === "out") {
        summary[record.bloodGroup].totalOut += record.quantity;
      }
    });

    Object.keys(summary).forEach((bloodGroup) => {
      summary[bloodGroup].balance =
        summary[bloodGroup].totalIn - summary[bloodGroup].totalOut;
    });

    return summary;
  };

  const summaryData = calculateSummary();

  return (
    <Layout>
      {error && <span>{error.message}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mt-4">
          {/* Recent Inventory In Cards */}
          <div className="card-container">
            <h4 className="card-title">Recent Inventory In</h4>
            <div className="card-list">
              {getRecentInventoryIn().map((record) => (
                <div key={record._id} className={`card ${getCardColor(record.inventoryType)}`}>
                  <div className="card-body">
                    <h5 className="card-subtitle">
                      <span className={`highlight-blood-group ${getBloodGroupClass(record.bloodGroup)}`}>
                        {record.bloodGroup}
                      </span>
                    </h5>
                    <p className="card-text">Quantity: {record.quantity} ml</p>
                    <p className="card-text">Donor Email: {record.email}</p>
                    <p className="card-text">Date: {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inventory Out Cards */}
          <div className="card-container">
            <h4 className="card-title">Recent Inventory Out</h4>
            <div className="card-list">
              {getRecentInventoryOut().map((record) => (
                <div key={record._id} className={`card ${getCardColor(record.inventoryType)}`}>
                  <div className="card-body">
                    <h5 className="card-subtitle">
                      <span className={`highlight-blood-group ${getBloodGroupClass(record.bloodGroup)}`}>
                        {record.bloodGroup}
                      </span> 
                    </h5>
                    <p className="card-text">Quantity: {record.quantity} ml</p>
                    <p className="card-text">Donor Email: {record.email}</p>
                    <p className="card-text">Date: {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="card-container">
            <h4 className="card-title">Summary</h4>
            <div className="card-list">
              {Object.keys(summaryData).map((bloodGroup) => (
                <div key={bloodGroup} className="card summary-card">
                  <div className="card-body">
                    <h5 className="card-subtitle">
                      <span className={`highlight-blood-group ${getBloodGroupClass(bloodGroup)}`}>
                        {bloodGroup}
                      </span> 
                    </h5>
                    <p className="card-text">Total In: {summaryData[bloodGroup].totalIn} ml</p>
                    <p className="card-text">Total Out: {summaryData[bloodGroup].totalOut} ml</p>
                    <b><i>
                    <p className="card-text" style={{ color: summaryData[bloodGroup].balance >= 0 ? "red" : "green" }}>
                      Balance: {summaryData[bloodGroup].balance} ml
                    </p> 
                    </i></b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default InventoryList;
