import React, { useState, useEffect } from "react";

import Sidebar2 from "../../../include/Sidebar2";
import Footer from "../../../include/Footer";
import Navbar from "../../../include/Navbar";
import Sidebar from "../../Admin/Sidebar/Sidebar";

const AdminUserManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [adminData, setAdminData] = useState({ username: "", password: "" });
  const [modalType, setModalType] = useState("");
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [deletingAdminId, setDeletingAdminId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAdmins = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admins");
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      setError("Failed to fetch admin data.");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!adminData.username || !adminData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add admin");
      }

      setSuccess("Admin added successfully!");
      setAdminData({ username: "", password: "" });
      setModalType("");
      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!adminData.username || !adminData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/admins/${editingAdmin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update admin");
      }

      setSuccess("Admin updated successfully!");
      setModalType("");
      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditModal = (admin) => {
    setEditingAdmin(admin);
    setAdminData({ username: admin.username, password: "" });
    clearMessages();
    setModalType("edit");
  };

  const openDeleteModal = (id) => {
    setDeletingAdminId(id);
    clearMessages();
    setModalType("delete");
  };

  const handleDeleteAdmin = async () => {
    clearMessages();

    try {
      const res = await fetch(`http://localhost:8080/api/admins/${deletingAdminId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete admin");

      setSuccess("Admin deleted successfully!");
      setModalType("");
      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar/>
        <div className="main-panel">
          <Navbar />
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
                <h3 className="fw-bold mb-3">Admin User Management</h3>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h4 className="card-title">Admins</h4>
                      <button className="btn btn-primary" onClick={() => { setModalType("add"); clearMessages(); }}>
                        <i className="fa fa-plus"></i> Add Admin
                      </button>
                    </div>

                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admins.length > 0 ? (
                            admins.map((admin, index) => (
                              <tr key={index}>
                                <td>{admin.username}</td>
                                <td>{admin.password}</td>
                                <td>
                                  <button className="btn btn-sm btn-info me-2" onClick={() => openEditModal(admin)}>Edit</button>
                                  <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal(admin.id)}>Delete</button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center">No Admins Found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </div>
        <Sidebar2 />
      </div>

      {/* Add/Edit Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={modalType === "add" ? handleAddAdmin : handleEditAdmin}>
                <div className="modal-header">
                  <h5 className="modal-title">{modalType === "add" ? "Add Admin" : "Edit Admin"}</h5>
                  <button type="button" className="close" onClick={() => setModalType("")}>×</button>
                </div>
                <div className="modal-body">
                  <div className="form-group mb-2">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={adminData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={adminData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  {error && <div className="alert alert-danger p-1 mt-2">{error}</div>}
                  {success && <div className="alert alert-success p-1 mt-2">{success}</div>}
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Save</button>
                  <button type="button" className="btn btn-danger" onClick={() => setModalType("")}>Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === "delete" && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content btn btn-warning">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={() => setModalType("")}>×</button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this admin?
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={handleDeleteAdmin}>Delete</button>
                  <button className="btn btn-secondary" onClick={() => setModalType("")}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUserManagement;
