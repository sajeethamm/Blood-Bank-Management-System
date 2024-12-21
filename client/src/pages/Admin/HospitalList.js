import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout.js";
import moment from "moment";
import API from "../../services/API.js";
import "../../styles/HospitalList.css"; // Ensure you have the correct path to your CSS file

const HospitalList = () => {
  const [data, setData] = useState([]);

  // Fetch hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/admin/hospital-list");
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

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this Hospital?");
      if (!answer) return;

      const { data } = await API.delete(`/admin/delete-hospital/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="mb-3" style={{ textAlign: "center" }}>Hospital Details</h2>
        <div className="hospital-list">
          {data?.map((record) => (
            <div key={record._id} className="hospital-card">
              <h4>{record.hospitalName}</h4>
              <p><strong>Email :</strong> {record.email}</p>
              <p><strong>Phone :</strong> {record.phone}</p>
              <p><strong>Address :</strong> {record.address}</p>
              <p><strong>Date :</strong> {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HospitalList;
