import React, { useEffect, useState, useCallback } from "react";
import Layout from "./../../components/shared/Layout/Layout.js";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API.js";
//import Spinner from "../../components/shared/Spinner.js";
import "../../styles/OrganizationPage.css"; // Ensure you have the correct path to your CSS file

const OrganizationPage = () => {
  // get current user
  const { user} = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Memoize the getOrg function
  const getOrg = useCallback(async () => {
    try {
      let response;
      if (user?.role === "donor") {
        response = await API.get("/inventory/get-orgnaization");
      } 
      if (user?.role === "hospital") {
        response = await API.get("/inventory/get-orgnaization-for-hospital");
      }
      
      if (response?.data?.success) {
        setData(response.data.organizations);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  }, [user]);

  useEffect(() => {
    getOrg();
  }, [getOrg]);

  return (
<Layout>
      <div className="container mt-4">
        <h2 className="mb-3" style={{ textAlign: "center" }}>Organization Details</h2>
        <div className="org-list">
          {data?.map((record) => (
            <div key={record._id} className="org-card">
              <h4>{record.organizationName}</h4>
              <p><strong>Email :</strong> {record.email}</p>
              <p><strong>Phone :</strong> {record.phone}</p>
              <p><strong>Address :</strong> {record.address}</p>
              <p><strong>Date :</strong> {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</p>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrganizationPage;
