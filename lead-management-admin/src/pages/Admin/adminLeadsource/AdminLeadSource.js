import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Sidebar2 from "../../../include/Sidebar2";
import Footer from "../../../include/Footer";
import Navbar from "../../../include/Navbar";

const AdminLeadSource = () => {
  const [sourceName, setSourceName] = useState("");
  const [sources, setSources] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch lead sources from backend
  const fetchSources = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/lead-source");
      if (!response.ok) throw new Error("Failed to fetch lead sources");
      const data = await response.json();
      setSources(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sourceName.trim()) {
      setError("Source name is required");
      return;
    }
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/api/lead-source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceName }),
      });

      if (!response.ok) throw new Error("Failed to add lead source");

      setSuccess("Lead source added successfully");
      setSourceName("");
      fetchSources();
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
                <h3 className="fw-bold mb-3">Add Lead Source</h3>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex align-items-center">
                        <h4 className="card-title">Add Source</h4>
                        <button
                          className="btn btn-primary btn-round ms-auto"
                          data-bs-toggle="modal"
                          data-bs-target="#addSourceModal"
                        >
                          <i className="fa fa-plus" /> Add Source
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      {/* Modal */}
                      <div className="modal fade" id="addSourceModal" tabIndex={-1} role="dialog">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header border-0">
                              <h5 className="modal-title">New Source</h5>
                              <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <p className="small">Create a new source using this form.</p>
                              <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                  <label htmlFor="sourceName">Source Name</label>
                                  <input
                                    type="text"
                                    id="sourceName"
                                    className="form-control"
                                    placeholder="Enter source name"
                                    value={sourceName}
                                    onChange={(e) => setSourceName(e.target.value)}
                                  />
                                  {error && <small className="text-danger">{error}</small>}
                                  {success && <small className="text-success">{success}</small>}
                                </div>

                                <div className="modal-footer border-0">
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                  >
                                    Add
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Table with fetched sources */}
                      <div className="table-responsive">
                        <table id="add-source" className="display table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Status</th>
                              <th style={{ width: "10%" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sources.length > 0 ? (
                              sources.map((source, index) => (
                                <tr key={index}>
                                  <td>{source.sourceName}</td>
                                  <td>Active</td>
                                  <td>
                                    <div className="form-button-action">
                                      <button type="button" className="btn btn-link btn-primary btn-lg">
                                        <i className="fa fa-edit" />
                                      </button>
                                      <button type="button" className="btn btn-link btn-danger">
                                        <i className="fa fa-times" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center">No Lead Source Found</td>
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
    </>
  );
};

export default AdminLeadSource;
