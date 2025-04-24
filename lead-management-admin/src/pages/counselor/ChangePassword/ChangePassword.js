import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../../../include/Navbar';
import Sidebar2 from '../../../include/Sidebar2';
import Footer from '../../../include/Footer';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  // Load the counselor username on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('counselorUsername') || sessionStorage.getItem('counselorUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Handle password change submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const counselorId = localStorage.getItem('counselorId');
    if (!counselorId) {
      setError('Counselor ID not found.');
      return;
    }
    console.log("Response data:", counselorId);

    // Call the API to update the password
    try {
      const res = await fetch(`http://localhost:8080/api/counselors/${counselorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to update password');
      }

      setMessage('Password changed successfully!');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate("/counselor/dashboard");
      }, 1000);
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
          <div className="container mt-5">
            <div className="page-inner">
              <div className="page-header">
                <h3 className="fw-bold mb-3">Change Password</h3>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex align-items-center">
                        <h4 className="card-title">Change Counselor Password</h4>
                      </div>
                    </div>

                    <div className="card-body">
                      {message && <div className="alert alert-info">{message}</div>}
                      {error && <div className="alert alert-danger">{error}</div>}
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Counselor Username</label>
                          <input
                            type="text"
                            className="form-control"
                            value={username}
                            readOnly
                            style={{ backgroundColor: '#f1f1f1', cursor: 'not-allowed' }}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Change Password
                        </button>
                      </form>
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

export default ChangePassword;
