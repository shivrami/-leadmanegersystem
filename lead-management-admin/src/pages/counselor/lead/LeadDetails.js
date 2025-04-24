import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../include/Navbar';
import Sidebar from '../../counselor/Sidebar/Sidebar';
import Sidebar2 from '../../../include/Sidebar2';
import Footer from '../../../include/Footer';

const LeadDetails = () => {
  const { leadId } = useParams(); // Get the leadId from the URL
  const [leadDetails, setLeadDetails] = useState(null);

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/leads/${leadId}`);
        if (!response.ok) throw new Error('Failed to fetch lead details');
        const data = await response.json();
        setLeadDetails(data);
      } catch (error) {
        console.error('Error fetching lead details:', error);
      }
    };
    fetchLeadDetails();
  }, [leadId]);

  if (!leadDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper flex">
  <Sidebar />
  <div className="main-panel flex-1 flex flex-col min-h-screen bg-gray-100">
    <Navbar />
    <div className="container mx-auto px-4 py-6 flex-1">
      <div className="page-inner">
        <div className="page-header mb-6">
          <h3 className="text-3xl font-semibold text-gray-800">Lead Details</h3>
        </div>
        <div className="card bg-white shadow-md rounded-lg p-6">
          <div className="card-body space-y-4">
            <h5 className="text-xl font-bold text-blue-700">Lead Name: <span className="font-normal text-gray-900">{leadDetails.leadName}</span></h5>
            <p><strong>Lead Source:</strong> {leadDetails.leadSourceName}</p>
            <p><strong>Status:</strong> {leadDetails.leadStatusName}</p>
            <p><strong>Location:</strong> {leadDetails.location}</p>
            <p><strong>Lead Date:</strong> {new Date(leadDetails.leadDate).toLocaleDateString()}</p>
            <p><strong>Courses:</strong> {leadDetails.courseNames.join(', ')}</p>
            <p><strong>Priority:</strong> {leadDetails.priority}</p>
            <p><strong>Notes:</strong> {leadDetails.leadNotes}</p>
            <p><strong>Estimated Value:</strong> ₹{leadDetails.estimatedValue}</p>
            <p><strong>Created Date:</strong> {new Date(leadDetails.createdDate).toLocaleDateString()}</p>
            <p><strong>Updated Date:</strong> {new Date(leadDetails.updatedDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <Sidebar2 />
</div>

  );
};

export default LeadDetails;
