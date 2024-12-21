import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout.js";
import API from "../../services/API.js";
import moment from "moment";

const Donor = () => {
  const [data, setData] = useState([]);
  //find donor records
  const getDonors = async () => {
    try {
      const { data } = await API.get("/inventory/get-donors");
      //   console.log(data);
      if (data?.success) {
        setData(data?.donors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  return (
<Layout>
      <div className="container mt-4">
        <h2 className="mb-3" style={{ textAlign: "center" }}>Donors Details</h2>
        <div className="donor-list">
          {data?.map((record) => (
            <div key={record._id} className="donor-card">
              <h4>{record.name || record.organizationName + " (ORG)"}</h4>
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

export default Donor;