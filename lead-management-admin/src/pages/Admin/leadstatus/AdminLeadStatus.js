import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Sidebar2 from "../../../include/Sidebar2";
import Footer from "../../../include/Footer";
import Navbar from "../../../include/Navbar";

const AdminLeadStatus = () => {
  const [statusName, setStatusName] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingStatus, setEditingStatus] = useState(null);
  const [deletingStatusId, setDeletingStatusId] = useState(null);
  const [modalType, setModalType] = useState(""); // "add", "edit", "delete"

  // Fetch lead statuses from backend
  const fetchStatuses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/lead-status");
      if (!response.ok) throw new Error("Failed to fetch lead statuses");
      const data = await response.json();
      setStatuses(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  // Add new status
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    if (!statusName.trim()) {
      setError("Status name is required");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/lead-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusName }),
      });
  
      if (!response.ok) throw new Error("Failed to add lead status");
  
      setSuccess("Lead status added successfully"); // Set success message
      setStatusName(""); // Reset input field
      fetchStatuses(); // Refresh lead statuses list
      setError(""); // Clear any previous error
    } catch (error) {
      setError(error.message);
      setSuccess(""); // Clear success message on error
    }
  };
  

  // Open edit modal and set editing status
  const openEditModal = (status) => {
    setEditingStatus(status);
    setStatusName(status.statusName);
    setModalType("edit");
  };

  // Update status
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!statusName.trim()) {
      setError("Status name is required");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/lead-status/${editingStatus.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusName }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setSuccess("Lead status updated successfully");
      setModalType(""); // Close modal
      fetchStatuses();
    } catch (error) {
      setError(error.message);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (id) => {
    setDeletingStatusId(id);
    setModalType("delete");
  };

  // Delete status
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/lead-status/${deletingStatusId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete status");

      setSuccess("Lead status deleted successfully");
      setModalType(""); // Close modal
      fetchStatuses();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
                <h3 className="fw-bold mb-3">Lead Status Management</h3>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex align-items-center">
                        <h4 className="card-title">Lead Statuses</h4>
                        <button
                          className="btn btn-primary btn-round ms-auto"
                          onClick={() => setModalType("add")}
                        >
                          <i className="fa fa-plus" /> Add Status
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      {/* Table with fetched statuses */}
                      <div className="table-responsive">
                        <table className="display table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Status</th>
                              <th style={{ width: "10%" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {statuses.length > 0 ? (
                              statuses.map((status, index) => (
                                <tr key={index}>
                                  <td>{status.statusName}</td>
                                  <td>Active</td>
                                  <td>
                                    <div className="form-button-action">
                                      <button
                                        type="button"
                                        className="btn btn-link btn-primary"
                                        onClick={() => openEditModal(status)}
                                      >
                                        <i className="fa fa-edit" />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-link btn-danger"
                                        onClick={() => openDeleteModal(status.id)}
                                      >
                                        <i className="fa fa-times" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center">No Lead Status Found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
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

      {/* Add & Edit Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalType === "add" ? "Add Status" : "Edit Status"}</h5>
                <button type="button" className="close" onClick={() => setModalType("")}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={modalType === "add" ? handleSubmit : handleEdit}>
                  <div className="form-group">
                    <label>Status Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={statusName}
                      onChange={(e) => setStatusName(e.target.value)}
                    />
                    {error && <small className="text-danger">{error}</small>}
                    {success && <small className="text-success">{success}</small>}
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-danger" onClick={() => setModalType("")}>Close</button>
                  </div>
                </form>
              </div>
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
                Are you sure you want to delete this status?
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
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

export default AdminLeadStatus; 