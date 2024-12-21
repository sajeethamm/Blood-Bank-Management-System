import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout.js";
import API from "../../services/API.js";
import moment from "moment";
import "../../styles/Hospitals.css"; // Ensure you have the correct path to your CSS file

const Hospitals = () => {
  const [data, setData] = useState([]);

  // Fetch hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/hospital");
      if (data?.success) {
        setData(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);


  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="mb-3" style={{ textAlign: "center" }}>Hospital Details</h2>
        <div className="hospital-list">
          {data?.map((record) => (
            <div key={record._id} className="hospital-card">
              <h4>{record.hospitalName }</h4>
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

export default Hospitals;
