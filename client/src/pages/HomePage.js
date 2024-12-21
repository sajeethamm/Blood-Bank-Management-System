import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner.js";
import Layout from "../components/shared/Layout/Layout.js";
import Modal from "../components/shared/modal/Modal.js";
import API from "../services/API.js";
import moment from "moment";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  
  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        
        <div className="container mt-4">

              <h4 
                className="card-title btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer" }} >
                <b> 
                  <i class="fa-solid fa-plus-minus me-3"></i>
                    Add Inventory 
                </b>
             </h4>

        <div className="card">
        <div className="card-header">
            <div className="card-body">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col" >Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity  (ml)</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity}</td>
                    <td>{record.email}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
            <Modal />
          </div>
        </div>

      
      )}
    </Layout>
  );
};

export default HomePage;