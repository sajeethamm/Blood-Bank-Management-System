import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout.js";
import moment from "moment";
import API from "../../services/API.js";
import "../../styles/OrgList.css"; // Ensure you have the correct path to your CSS file

const OrgList = () => {
  const [data, setData] = useState([]);

  // Fetch organization records
  const getOrgs = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrgs();
  }, []);

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this Organisation?");
      if (!answer) return;

      const { data } = await API.delete(`/admin/delete-organization/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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

export default OrgList;
