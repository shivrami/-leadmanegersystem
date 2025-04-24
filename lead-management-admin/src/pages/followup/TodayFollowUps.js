import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaUser, FaShareAlt, FaCheckCircle, FaBook, FaPhone, FaCalendar, FaEye, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'datatables.net';
import Sidebar from '../counselor/Sidebar/Sidebar';
import Navbar from '../../include/Navbar';

const TodayFollowUps = () => {
  const counselorId = localStorage.getItem('counselorId'); // Get counselorId from localStorage
  const navigate = useNavigate();
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
  const [followupModalOpen, setFollowupModalOpen] = useState(false);  // State for follow-up modal
  const [followupDescription, setFollowupDescription] = useState('');  // State for follow-up description

  const handleModalClose = () => setModalOpen(false);
  const handleFollowupModalClose = () => setFollowupModalOpen(false);  // Close follow-up modal

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
      follow_up_date: ''
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

  const handleFollowup = (lead) => {
    setCurrentLead(lead);
    setFollowupModalOpen(true);  // Open the follow-up modal
  };

  const handleFollowupSubmit = async (e) => {
    e.preventDefault();
  
    if (!currentLead) return;
  
    // 1️⃣ Use the date the user picked, not “today”
    const followDate = formData.follow_up_date;
  
    try {
      // Create the follow-up note
      const postResp = await fetch(
        `http://localhost:8080/api/followups/lead/${currentLead.id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId: currentLead.id,
            description: followupDescription,
            followUpDate: followDate
          })
        }
      );
      if (!postResp.ok) throw new Error('Failed to save follow-up');
  
      // Update the lead’s next follow-up date (and status if desired)
      const putResp = await fetch(
        `http://localhost:8080/api/leads/${currentLead.id}/nextfollowup`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            follow_up_date: followDate,
            leadStatusId: formData.leadStatusId
          })
        }
      );
      if (!putResp.ok) throw new Error('Failed to update lead');
  
      // Refresh the table and close modal
      await fetchLeads();
      setFollowupModalOpen(false);
      setFollowupDescription('');
    } catch (error) {
      console.error('Error during follow-up submit:', error);
    }
  };
  

  const updateFollowUpDate = async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const response = await fetch(`http://localhost:8080/api/leads/${currentLead.id}/nextfollowup`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          follow_up_date: today
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update follow-up date');
      }
    } catch (error) {
      console.error('Error updating follow-up date:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/leads");
      if (!response.ok) throw new Error("Failed to fetch leads");
      const data = await response.json();
      const today = new Date().toISOString().split('T')[0];
      setLeads(data.filter(lead => lead.leadStatusName === 'Open' &&
        lead.follow_up_date?.split('T')[0] === today));
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
                            <th><i className="fas fa-calendar-check"></i> Followup</th>
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
                                <button className="btn btn-sm btn-success" onClick={() => handleFollowup(lead)}>
                                  <FaCheckCircle /> Followup
                                </button>
                              </td>
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
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  <label>Lead Date</label>
                  <input type="date" className="form-control" name="leadDate" value={formData.leadDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select className="form-control" name="priority" value={formData.priority} onChange={handleChange} required>
                    <option value="">Select Priority</option>
                    {priorityOptions.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Lead Notes</label>
                  <textarea className="form-control" name="leadNotes" value={formData.leadNotes} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                  <label>Contact No</label>
                  <input type="tel" className="form-control" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Referral</label>
                  <input type="text" className="form-control" name="referral" value={formData.referral} onChange={handleChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {currentLead ? 'Update Lead' : 'Add Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Followup Modal */}
      {followupModalOpen && (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <form className="modal-content" onSubmit={handleFollowupSubmit}>
        <div className="modal-header">
          <h5 className="modal-title">Follow-up for {currentLead?.leadName}</h5>
          <button type="button" className="btn-close" onClick={handleFollowupModalClose}></button>
        </div>

        <div className="form-group">
          <label>Lead Status</label>
          <select
            className="form-control"
            name="leadStatusId"
            value={formData.leadStatusId}
            onChange={handleChange}
            required
          >
            <option value="">Select Lead Status</option>
            {leadStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.statusName}
              </option>
            ))}
          </select>
        </div>

        {/* Show only if selected status is "Open" (assuming its ID is 1) */}
        {formData.leadStatusId === '13' && (
          <div className="form-group">
            <label>Next Followup Date</label>
            <input
              type="date"
              className="form-control"
              name="follow_up_date"
              value={formData.follow_up_date}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="followupDescription" className="form-label">Description</label>
            <textarea
              id="followupDescription"
              className="form-control"
              value={followupDescription}
              onChange={(e) => setFollowupDescription(e.target.value)}
              rows={4}
              required
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleFollowupModalClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Follow-up
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default TodayFollowUps;
