import {
  Link,
  useLocation,
} from 'react-router-dom';

import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="sidebar-root">

      <div className="sidebar-header">
        <div className="sidebar-logo">📊</div>
        <h3 className="sidebar-title">Teams</h3>
      </div>

      <nav className="sidebar-nav">

        <Link
          to="/"
          className={`sidebar-link ${isActive('/') ? 'active' : ''}`}
        >
          <span className="sidebar-icon">📈</span>
          <span className="sidebar-label">Dashboard</span>
        </Link>


        <Link
          to="/meetings"
          className={`sidebar-link ${isActive('/meetings')
              ? 'active'
              : ''
            }`}
        >
          <span className="sidebar-icon">
            📅
          </span>

          <span className="sidebar-label">
            Meetings
          </span>
        </Link>
        <Link
          to="/upload-transcript"
          className={`sidebar-link ${isActive('/upload-transcript')
              ? 'active'
              : ''
            }`}
        >
          <span className="sidebar-icon">
            📄
          </span>

          <span className="sidebar-label">
            Upload Transcript
          </span>
        </Link>

        <Link
          to="/action-items"
          className={`sidebar-link ${isActive('/action-items') ? 'active' : ''}`}
        >
          <span className="sidebar-icon">✓</span>
          <span className="sidebar-label">Action Items</span>
        </Link>

        <Link
          to="/email-logs"
          className={`sidebar-link ${isActive('/email-logs') ? 'active' : ''}`}
        >
          <span className="sidebar-icon">📧</span>
          <span className="sidebar-label">Email Logs</span>
        </Link>

      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">Navigation</div>
      </div>

    </div>
  );
}