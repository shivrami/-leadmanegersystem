import React from 'react'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../counselor/Sidebar/Sidebar';
import Navbar from '../../../include/Navbar';
import Sidebar2 from '../../../include/Sidebar2';
import Footer from '../../../include/Footer';
import { FaUser, FaShareAlt, FaCheckCircle, FaBook, FaPhone, FaCalendar, FaEye, FaEdit } from 'react-icons/fa';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
import $ from 'jquery';


const Report = () => {
    const counselorId = localStorage.getItem('counselorId'); // Get counselorId from localStorage
      const storedUsername =
        localStorage.getItem('counselorUsername') || sessionStorage.getItem('counselorUsername');
    
      const [leads, setLeads] = useState([]);
      const [leadSources, setLeadSources] = useState([]);
      const [leadStatuses, setLeadStatuses] = useState([]);
      const [courses, setCourses] = useState([]);
      const [priorityOptions] = useState([
        { id: 'high', name: 'High' },
        { id: 'medium', name: 'Medium' },
        { id: 'low', name: 'Low' },
      ]);
    
      const [modalOpen, setModalOpen] = useState(false);
      const [formData, setFormData] = useState({
        leadName: '',
        location: '',
        counselorId: counselorId || '',
        leadSourceId: '',
        leadStatusId: '',
        courseIds: [],
        leadDate: '',
        priority: '',
        leadNotes: '',
        contactNo: '',
        email: '',
        gender: '',
        referral: ''
      });
    
      const [currentLead, setCurrentLead] = useState(null);
    
      const handleModalClose = () => setModalOpen(false);
    
      const resetForm = () => {
        setFormData({
          leadName: '',
          location: '',
          leadSourceId: '',
          counselorId: counselorId || '',
          leadStatusId: '',
          courseIds: [],
          leadDate: '',
          priority: '',
          leadNotes: '',
          contactNo: '',
          email: '',
          gender: '',
          referral: '',
        });
      };
    
      const handleAdd = () => {
        setCurrentLead(null);
        resetForm();
        setModalOpen(true);
      };
    
      const handleEdit = (lead) => {
        setModalOpen(true);
        setCurrentLead(lead);
        setFormData({
          leadName: lead.leadName || '',
          location: lead.location || '',
          leadSourceId: lead.leadSourceName || '',
          leadStatusId: lead.leadStatusName || '',
          courseIds: lead.courseNames || [],
          leadDate: lead.leadDate || '',
          priority: lead.priority || '',
          leadNotes: lead.leadNotes || '',
          contactNo: lead.contactNo || '',
          email: lead.email || '',
          gender: lead.gender || '',
          referral: lead.referral || '',
          counselorId: counselorId || '',
          leadSourceName:lead.leadSourceName || ''
        });
      };
    
      const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
          try {
            const res = await fetch(`http://localhost:8080/api/leads/${id}`, {
              method: 'DELETE'
            });
            if (res.ok) {
              fetchLeads();
            } else {
              throw new Error('Delete failed');
            }
          } catch (error) {
            console.error('Error deleting lead:', error);
          }
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'courseIds') {
          const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
          setFormData({
            ...formData,
            [name]: selectedOptions
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const method = currentLead ? 'PUT' : 'POST';
        const url = currentLead
          ? `http://localhost:8080/api/leads/${currentLead.id}`
          : `http://localhost:8080/api/leads`;
    
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (response.ok) {
            fetchLeads();
            handleModalClose();
            resetForm();
          } else {
            throw new Error('Save/Update failed');
          }
        } catch (error) {
          console.error('Error submitting lead:', error);
        }
      };
    
      const fetchLeads = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/leads");
          if (!response.ok) throw new Error("Failed to fetch leads");
           const data = await response.json();
    
          setLeads(data);
          
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      };
    
      const fetchDropdownData = async () => {
        try {
          const [sourcesRes, statusesRes, coursesRes] = await Promise.all([
            fetch('http://localhost:8080/api/lead-source').then(res => res.json()),
            fetch('http://localhost:8080/api/lead-status').then(res => res.json()),
            fetch('http://localhost:8080/api/courses').then(res => res.json())
          ]);
          setLeadSources(sourcesRes);
          setLeadStatuses(statusesRes);
          setCourses(coursesRes);
        } catch (error) {
          console.error('Error fetching dropdown data:', error);
        }
      };
    
      useEffect(() => {
        fetchLeads();
        fetchDropdownData();
      }, []);
    
      useEffect(() => {
        if (leads.length > 0) {
          $('#basic-datatables').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            responsive: true
          });
        }
      }, [leads]);
    
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Navbar />
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">Lead Management</h3>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h4 className="card-title">Leads</h4>
                    <button className="btn btn-primary ms-auto" onClick={handleAdd}>
                      <i className="fas fa-plus-circle"></i>  Add Lead
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table id="basic-datatables" className="display table table-striped table-hover">
                        <thead>
                          <tr>
                            <th><i className="fas fa-user"></i> Lead Name</th>
                            <th><i className="fas fa-share-alt"></i> Lead Source</th>
                            <th><i className="fas fa-check-circle"></i> Lead Status</th>
                            <th><i className="fas fa-book"></i> Course</th>
                            <th><i className="fas fa-phone"></i> Contact</th>
                            <th><i className="fas fa-calendar"></i> Lead Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {leads.map((lead) => (
                            <tr key={lead.id}>
                              <td>{lead.leadName}</td>
                              <td>{lead.leadSourceName || '-'}</td>
                              <td>{lead.leadStatusName || '-'}</td>
                              <td>{lead.courseNames?.join(', ') || '-'}</td>
                              <td>{lead.contactNo || '-'} <br />{lead.email || '-'}</td>
                              <td>{new Date(lead.leadDate).toLocaleDateString() || '-'}</td>
                              <td>
                                <div className="d-flex justify-content-start">
                                  <Link to={`/lead-details/${lead.id}`} className="btn btn-link text-info me-1">
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                  <button className="btn btn-link text-primary me-3" onClick={() => handleEdit(lead)}>
                                    <i className="fa fa-edit"></i>
                                  </button>
                                  
                                </div>
                              </td>
                            </tr>
                          ))}
                          {leads.length === 0 && (
                            <tr>
                              <td colSpan="7" className="text-center text-muted">No leads available.</td>
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

       {/* Modal */}
       {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{currentLead ? 'Edit Lead' : 'Add Lead'}</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Lead Name</label>
                  <input type="text" className="form-control" name="leadName" value={formData.leadName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Lead Source</label>
                  <select className="form-control" name="leadSourceId" value={formData.leadSourceId} onChange={handleChange} required>
                    <option value="">Select Lead Source</option>
                    {leadSources.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.sourceName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Lead Status</label>
                  <select className="form-control" name="leadStatusId" value={formData.leadStatusId} onChange={handleChange} required>
                    <option value="">Select Lead Status</option>
                    {leadStatuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.statusName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Course</label>
                  <select
                    className="form-control"
                    name="courseIds"
                    value={formData.courseIds}
                    onChange={handleChange}
                    multiple
                    required
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    className="form-control"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Priority</option>
                    {priorityOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    className="form-control"
                    name="leadNotes"
                    value={formData.leadNotes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Referral</label>
                  <input
                    type="text"
                    className="form-control"
                    name="referral"
                    value={formData.referral}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {currentLead ? 'Update Lead' : 'Add Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Report