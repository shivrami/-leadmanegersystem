import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/counselorlogin');
  };

  // Fetch counselor username
  const storedUsername =
    localStorage.getItem('counselorUsername') || sessionStorage.getItem('counselorUsername');

  return (
    <>
      <div className="sidebar" data-background-color="dark">
        <div className="sidebar-logo">
          <div className="logo-header" data-background-color="dark">
            <a href="/" className="logo">
              <img src="assets/img/kaiadmin/logo_light.svg" alt="navbar brand" className="navbar-brand" height={20} />
            </a>
            <div className="nav-toggle">
              <button className="btn btn-toggle toggle-sidebar"><i className="gg-menu-right" /></button>
              <button className="btn btn-toggle sidenav-toggler"><i className="gg-menu-left" /></button>
            </div>
            <button className="topbar-toggler more"><i className="gg-more-vertical-alt" /></button>
          </div>
        </div>

        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">

            {/* Counselor Username */}
            {storedUsername && (
              <div className="text-center text-white mb-3 mt-2">
              <h5><strong>Welcome,</strong> </h5><br />
                <span>{storedUsername}</span>
              </div>
            )}

            <ul className="nav nav-secondary">
              {/* Dashboard */}
              <li className="nav-item active">
                <a href="/counselor/dashboard">
                  <i className="fas fa-home" />
                  <p>Dashboard </p>
                </a>
              </li>

              {/* All Leads */}
              <li className="nav-item">
                <a href="/counselor/allleads">
                  <i className="fas fa-list me-2" />
                  <p>All Leads</p>
                </a>
              </li>

              {/* Leads Section */}
              <li className="nav-item">
                <a data-bs-toggle="collapse" href="#leadsSection">
                  <i className="fas fa-user-plus" />
                  <p>Leads</p>
                  <span className="caret" />
                </a>
                <div className="collapse" id="leadsSection">
                  <ul className="nav nav-collapse">
                    <li>
                      <a href="/counselor/openleads">
                        <span className="sub-item">
                          <i className="fas fa-folder-open me-2" />
                          Open Leads
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/counselor/convertedleads">
                        <span className="sub-item">
                          <i className="fas fa-check-circle me-2" />
                          Converted Leads <strong>True</strong>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/counselor/closedleads">
                        <span className="sub-item">
                          <i className="fas fa-times-circle me-2" />
                          Closed Leads
                        </span>
                      </a>
                    </li>
                    
                  </ul>
                </div>
              </li>

              {/* Follow-ups */}
              <li className="nav-item">
                <a data-bs-toggle="collapse" href="#followups">
                  <i className="fas fa-clock" />
                  <p>Follow-Ups</p>
                  <span className="caret" />
                </a>
                <div className="collapse" id="followups">
                  <ul className="nav nav-collapse">
                    <li>
                      <a href="/counselor/todayfollowups">
                        <span className="sub-item">
                          <i className="fas fa-calendar-check me-2" />
                          Today’s Follow-ups
                        </span>
                      </a>
                    </li>
                  
                    <li>
                      <a href="/counselor/overduefollowups">
                        <span className="sub-item">
                          <i className="fas fa-calendar-times me-2" />
                          Overdue Follow-ups
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/counselor/futurefollowups">
                        <span className="sub-item">
                          <i className="fas fa-calendar-plus me-2" />
                          Future Follow-ups
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Change Password */}
              <li className="nav-item">
                <a href="/counselor/changepassword">
                  <i className="fas fa-key" />
                  <p>Change Password</p>
                </a>
              </li>

              {/* Logout */}
              <li className="nav-item">
                <a href="#logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" />
                  <p>Logout</p>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
