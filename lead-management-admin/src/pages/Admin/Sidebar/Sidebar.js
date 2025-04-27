import React from 'react'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token or any user data from localStorage
    localStorage.removeItem('authToken');
    // You can also clear everything with localStorage.clear();
    navigate('/adminlogin'); 
  };

  return (
    <>
         <div className="sidebar" data-background-color="dark">
    <div className="sidebar-logo">
      {/* Logo Header */}
      <div className="logo-header" data-background-color="dark">
        <a href="index.html" className="logo">
          <img
            src="assets/img/kaiadmin/logo_light.svg"
            alt="navbar brand"
            className="navbar-brand"
            height={20}
          />
        </a>
        <div className="nav-toggle">
          <button className="btn btn-toggle toggle-sidebar">
            <i className="gg-menu-right" />
          </button>
          <button className="btn btn-toggle sidenav-toggler">
            <i className="gg-menu-left" />
          </button>
        </div>
        <button className="topbar-toggler more">
          <i className="gg-more-vertical-alt" />
        </button>
      </div>
      {/* End Logo Header */}
    </div>
    <div className="sidebar-wrapper scrollbar scrollbar-inner">
      <div className="sidebar-content">
        <ul className="nav nav-secondary">
          <li className="nav-item active">
            <a
              data-bs-toggle="collapse"
              href="#dashboard"
              className="collapsed"
              aria-expanded="false"
            >
              <i className="fas fa-home" />
              <p>Dashboard</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="dashboard">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/admin/dashboard">
                    <span className="sub-item">Dashboard </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-section">
            <span className="sidebar-mini-icon">
              <i className="fa fa-ellipsis-h" />
            </span>
            <h4 className="text-section">Components</h4>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="collapse" href="#base">
              <i className="fas fa-layer-group" />
              <p>Reports</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="base">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/admin/report">
                    <span className="sub-item">Manage</span>
                  </a>
                </li>
                
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="collapse" href="#sidebarLayouts">
              <i className="fas fa-th-list" />
              <p>Lead Source</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="sidebarLayouts">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/admin/leadsource">
                    <span className="sub-item">Manage</span>
                  </a>
                </li>
               
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="collapse" href="#forms">
              <i className="fas fa-pen-square" />
              <p>Lead Status</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="forms">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/admin/leadstatus">
                    <span className="sub-item">Manage</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="collapse" href="#tables">
              <i className="fas fa-table" />
              <p> Course Management </p>
              <span className="caret" />
            </a>
            <div className="collapse" id="tables">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/admin/course">
                    <span className="sub-item">Manage</span>
                  </a>
                </li>
                
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="collapse" href="/admin/counselorUserManagement">
              <i className="fas fa-map-marker-alt" />
              <p> Counselor Management</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="maps">
              <ul className="nav nav-collapse">
                <li>
                  <a href="maps/googlemaps.html">
                    <span className="sub-item">Manage</span>
                  </a>
                </li>
                
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="collapse" href="#charts">
              <i className="far fa-chart-bar" />
              <p>User Managemen</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="charts">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/admin/adminUserManagement">
                    <span className="sub-item">Admin </span>
                  </a>
                </li>
                <li>
                  <a href="/admin/counselorUserManagement">
                    <span className="sub-item">Counselor</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a href="widgets.html">
              <i className="fas fa-desktop" />
              <p>Notifications </p>
              <span className="badge badge-success">4</span>
            </a>
          </li>
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
  )
}

export default Sidebar