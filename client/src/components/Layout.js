import { Link } from "react-router-dom";
import {
  Menu,
  Home,
  FileText,
  ClipboardList,
  ChevronDown,
} from "lucide-react";

function Layout({ children }) {
  return (
    <div className="main-container">
      <div className="sidebar">
        <div className="logo-section">
          <div className="nba-logo">NBA</div>

          <div>
            <h4>NATIONAL BOARD</h4>
            <p>OF ACCREDITATION</p>
          </div>
        </div>

        <ul className="menu">
          <li><Home size={18}/> Dashboard</li>

          <li><FileText size={18}/> Accreditation</li>

          <li><ClipboardList size={18}/> Program Details</li>

          <li className="active-menu">
            <ClipboardList size={18}/>
            Criteria
            <ChevronDown size={18} className="right-icon"/>
          </li>

          <div className="sub-menu">
            <div className="submenu-item">
              <ChevronDown size={15}/>
              1. Curricular Aspects
            </div>

            <Link to="/" className="submenu-item2">
              1.1 Vision, Mission and PEO’s
            </Link>

            <Link to="/academic" className="submenu-item2">
              1.2 Academic Flexibility
            </Link>

            <Link to="/curriculum" className="submenu-item2">
              1.3 Curriculum Design
            </Link>

            <Link to="/feedback" className="submenu-item2">
              1.4 Feedback System
            </Link>
          </div>
        </ul>
      </div>

      <div className="content">
        <div className="topbar">
          <div className="top-left">
            <Menu size={28}/>
            <h1>PAA S (Platform as a Service)</h1>
          </div>

          <div className="top-right">
            <h3>XYZ Institute of Technology</h3>
            <p>Academic Year : 2024-25</p>
          </div>
        </div>

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;