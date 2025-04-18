import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../../../include/Navbar';
import Sidebar2 from '../../../include/Sidebar2';
import Footer from '../../../include/Footer';


const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('counselorUsername') || sessionStorage.getItem('counselorUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Call API here
    setMessage('Password changed successfully!');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar/>
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

                        <button type="submit" className="btn btn-primary">Change Password</button>
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
