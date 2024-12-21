import React from "react";
import Layout from "../../components/shared/Layout/Layout.js";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4 mx-4">
          <h1 className="text-center mb-4">
            Welcome Admin <span className="text-success">{user?.name}</span>
          </h1>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Manage Hemo Care</h3>
              <hr />
              <p className="card-text">
                The <b>Hemo Care</b> is conducted on several dedicated BBMS campuses across the country.
                Although we constitute a small fraction of the total BBMS budget, our facilities and funding 
                structure provide us with a distinctive research environment. We are able to leverage the 
                extensive resources and expertise across the IRP to perform truly interdisciplinary research 
                from the bench to the bedside. We are also well-positioned to capitalize quickly on new 
                scientific opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
