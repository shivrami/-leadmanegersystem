import React, { useState, useEffect } from "react";
import Sidebar2 from "../../../include/Sidebar2";
import Footer from "../../../include/Footer";
import Navbar from "../../../include/Navbar";
import Sidebar from "../../Admin/Sidebar/Sidebar";

const CounselorUserManagement = () => {
  const [counselors, setCounselors] = useState([]);
  const [counselorData, setCounselorData] = useState({ counselorName: "", counselorUsername: "", password: "" });
  const [modalType, setModalType] = useState("");
  const [editingCounselor, setEditingCounselor] = useState(null);
  const [deletingCounselorId, setDeletingCounselorId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCounselors = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/counselors");
      const data = await res.json();
      setCounselors(data);
    } catch (err) {
      setError("Failed to fetch counselor data.");
    }
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  const handleInputChange = (e) => {
    setCounselorData({ ...counselorData, [e.target.name]: e.target.value });
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleAddCounselor = async (e) => {
    e.preventDefault();
    clearMessages();

    const { counselorName, counselorUsername, password } = counselorData;
    if (!counselorName || !counselorUsername || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/counselors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(counselorData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add counselor");
      }

      setSuccess("Counselor added successfully!");
      setCounselorData({ counselorName: "", counselorUsername: "", password: "" });
      setModalType("");
      fetchCounselors();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCounselor = async (e) => {
    e.preventDefault();
    clearMessages();

    const { counselorName, counselorUsername, password } = counselorData;
    if (!counselorName || !counselorUsername || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/counselors/${editingCounselor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(counselorData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update counselor");
      }

      setSuccess("Counselor updated successfully!");
      setModalType("");
      fetchCounselors();
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditModal = (counselor) => {
    setEditingCounselor(counselor);
    setCounselorData({ counselorName: counselor.counselorName, counselorUsername: counselor.counselorUsername, password: "" });
    clearMessages();
    setModalType("edit");
  };

  const openDeleteModal = (id) => {
    setDeletingCounselorId(id);
    clearMessages();
    setModalType("delete");
  };

  const handleDeleteCounselor = async () => {
    clearMessages();

    try {
      const res = await fetch(`http://localhost:8080/api/counselors/${deletingCounselorId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete counselor");

      setSuccess("Counselor deleted successfully!");
      setModalType("");
      fetchCounselors();
    } catch (err) {
      setError(err.message);
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
                <h3 className="fw-bold mb-3">Counselor User Management</h3>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h4 className="card-title">Counselors</h4>
                      <button className="btn btn-primary" onClick={() => { setModalType("add"); clearMessages(); }}>
                        <i className="fa fa-plus"></i> Add Counselor
                      </button>
                    </div>

                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {counselors.length > 0 ? (
                            counselors.map((counselor, index) => (
                              <tr key={index}>
                                <td>{counselor.counselorName}</td>
                                <td>{counselor.counselorUsername}</td>
                                <td>{counselor.password}</td>
                                <td>
                                  <button className="btn btn-sm btn-info me-2" onClick={() => openEditModal(counselor)}>Edit</button>
                                  <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal(counselor.id)}>Delete</button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center">No Counselors Found</td>
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
              <form onSubmit={modalType === "add" ? handleAddCounselor : handleEditCounselor}>
                <div className="modal-header">
                  <h5 className="modal-title">{modalType === "add" ? "Add Counselor" : "Edit Counselor"}</h5>
                  <button type="button" className="close" onClick={() => setModalType("")}>×</button>
                </div>
                <div className="modal-body">
                  <div className="form-group mb-2">
                    <label>Name</label>
                    <input
                      type="text"
                      name="counselorName"
                      className="form-control"
                      value={counselorData.counselorName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Username</label>
                    <input
                      type="text"
                      name="counselorUsername"
                      className="form-control"
                      value={counselorData.counselorUsername}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={counselorData.password}
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
                Are you sure you want to delete this counselor?
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={handleDeleteCounselor}>Delete</button>
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

export default CounselorUserManagement;
