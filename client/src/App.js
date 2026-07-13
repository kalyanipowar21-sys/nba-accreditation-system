import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import "./App.css";

/* =========================
   CRITERIA 1
========================= */
import VisionMission from "./pages/VisionMission";
import Curriculum from "./pages/Curriculum";
import PoPso from "./pages/PoPso";
import CourseMatrix from "./pages/CourseMatrix";
import ArticulationMatrix from "./pages/ArticulationMatrix";


import Criteria6 from "./pages/Criteria6";
import FacultyDevelopment from "./pages/FacultyDevelopment";
import FacultyActivities from "./pages/FacultyActivities";
import ResearchConsultancy from "./pages/ResearchConsultancy";
import MembershipAdd from "./pages/MembershipAdd";
import ResourcePersonAdd from "./pages/ResourcePersonAdd";
import ParticipationAdd from "./pages/ParticipationAdd";
import MoocsAdd from "./pages/MoocsAdd";
import FdpAdd from "./pages/FdpAdd";
import StudentProjectAdd from "./pages/StudentProjectAdd";
import InternshipAdd from "./pages/InternshipAdd";
import AcademicResearchAdd from "./pages/AcademicResearchAdd";
import DevelopmentActivityAdd from "./pages/DevelopmentActivityAdd";
import SponsoredResearchAdd from "./pages/SponsoredResearchAdd";
import ConsultancyAdd from "./pages/ConsultancyAdd";
import SeedMoneyAdd from "./pages/SeedMoneyAdd";
import MembershipView from "./pages/MembershipView";
import ResourcePersonView from "./pages/ResourcePersonView";
import ParticipationView from "./pages/ParticipationView";
import MoocsView from "./pages/MoocsView";
import FdpView from "./pages/FdpView";
import StudentProjectView from "./pages/StudentProjectView";
import InternshipView from "./pages/InternshipView";
import AcademicResearchView from "./pages/AcademicResearchView";
import DevelopmentActivityView from "./pages/DevelopmentActivityView";
import SponsoredResearchView from "./pages/SponsoredResearchView";
import ConsultancyView from "./pages/ConsultancyView";
import SeedMoneyView from "./pages/SeedMoneyView";
function App() {
  const [openCriteria1, setOpenCriteria1] = useState(true);
  const [openCriteria6, setOpenCriteria6] = useState(false);
  return (
    <Router>
      <div className="main-container">

        {/* =========================
             SIDEBAR
        ========================= */}

        <div className="sidebar">

          <div className="logo-section">
            <img
              src="/nba-logo.png"
              alt="NBA Logo"
              className="logo-img"
            />

            <div className="logo-text">
              <h2>NBA</h2>
              <p>Accreditation</p>
              <p>Management System</p>
            </div>
          </div>

          <ul className="menu">

            <li className="criteria-header">
              Criteria Management
            </li>

            <li
              className="criteria-title"
              onClick={() =>
                setOpenCriteria1(!openCriteria1)
              }
            >
              {openCriteria1 ? "▼" : "▶"} Criteria 1
            </li>
                      {openCriteria1 && (
            <>
              {/* 1.1 Vision */}
              <li>
                <NavLink
                  to="/vision"
                  className={({ isActive }) =>
                    isActive
                      ? "submenu-active"
                      : "submenu-item"
                  }
                >
                  1.1 Vision, Mission & PEO's
                </NavLink>
              </li>

              {/* 1.2 Curriculum */}
              <li>
                <NavLink
                  to="/curriculum"
                  className={({ isActive }) =>
                    isActive
                      ? "submenu-active"
                      : "submenu-item"
                  }
                >
                  1.2 Curriculum Management
                </NavLink>
              </li>

              {/* 1.3 PO PSO */}
              <li>
                <NavLink
                  to="/po-pso"
                  className={({ isActive }) =>
                    isActive
                      ? "submenu-active"
                      : "submenu-item"
                  }
                >
                  1.3 PO, PSO & Mapping
                </NavLink>
              </li>

              {/* 1.4 Course Matrix */}
              <li>
                <NavLink
                  to="/course-matrix"
                  className={({ isActive }) =>
                    isActive
                      ? "submenu-active"
                      : "submenu-item"
                  }
                >
                  1.4 Course Outcomes & Matrix
                </NavLink>
              </li>

              {/* 1.5 Articulation Matrix */}
              <li>
                <NavLink
                  to="/articulation-matrix"
                  className={({ isActive }) =>
                    isActive
                      ? "submenu-active"
                      : "submenu-item"
                  }
                >
                  1.5 All Courses Articulation Matrix
                </NavLink>
              </li>

            </>
          )}

          <li>▶ Criteria 4</li>
          <li>▶ Criteria 5</li>
          
          
 <li
  className="criteria-title"
  onClick={() => setOpenCriteria6(!openCriteria6)}
>
  {openCriteria6 ? "▼" : "▶"} Criteria 6
</li>

{openCriteria6 && (
  <>
   

    <li>
      <NavLink
        to="/criteria6/faculty-development"
        className={({ isActive }) =>
          isActive ? "submenu-active" : "submenu-item"
        }
      >
        Faculty Development
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/criteria6/faculty-activities"
        className={({ isActive }) =>
          isActive ? "submenu-active" : "submenu-item"
        }
      >
        Faculty Activities
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/criteria6/research"
        className={({ isActive }) =>
          isActive ? "submenu-active" : "submenu-item"
        }
      >
        Research & Consultancy
      </NavLink>
    </li>
  </>
)}
          <li>▶ Criteria 7</li>
          <li>▶ Criteria 8</li>
          <li>▶ Criteria 9</li>

          <li>📄 Reports</li>
          <li>⚙ Settings</li>

        </ul>
      </div>

      {/* =========================
            CONTENT
      ========================= */}

      <div className="content">

        <div className="topbar">
          <h2>NBA Accreditation Management System</h2>
        </div>

        <Routes>

          {/* =========================
               HOME
          ========================= */}

         
                    {/* =========================
                CRITERIA 1
          ========================= */}

          <Route
            path="/vision"
            element={<VisionMission />}
          />

          <Route
            path="/curriculum"
            element={<Curriculum />}
          />

          <Route
            path="/po-pso"
            element={<PoPso />}
          />

          <Route
            path="/course-matrix"
            element={<CourseMatrix />}
          />

          <Route
            path="/articulation-matrix"
            element={<ArticulationMatrix />}
          />
<Route
  path="/criteria6"
  element={<Criteria6 />}
/>

<Route
  path="/criteria6/faculty-development"
  element={<FacultyDevelopment />}
/>

<Route
  path="/criteria6/faculty-activities"
  element={<FacultyActivities />}
/>

<Route
  path="/criteria6/research"
  element={<ResearchConsultancy />}
/>
<Route
  path="/criteria6/membership/add"
  element={<MembershipAdd />}
/>
<Route
  path="/criteria6/resource-person/add"
  element={<ResourcePersonAdd />}
/>
<Route
  path="/criteria6/participation/add"
  element={<ParticipationAdd />}
/>
<Route
  path="/criteria6/moocs/add"
  element={<MoocsAdd />}
/>
<Route
  path="/criteria6/fdp/add"
  element={<FdpAdd />}
/>
<Route
  path="/criteria6/student-project/add"
  element={<StudentProjectAdd />}
/>
<Route
  path="/criteria6/internship/add"
  element={<InternshipAdd />}
/>
<Route
  path="/criteria6/academic-research/add"
  element={<AcademicResearchAdd />}
/>
<Route
  path="/criteria6/development-activities/add"
  element={<DevelopmentActivityAdd/>}
/>
<Route
  path="/criteria6/sponsored-research/add"
  element={<SponsoredResearchAdd />}
/>

<Route
  path="/criteria6/consultancy/add"
  element={<ConsultancyAdd />}
/>

<Route
  path="/criteria6/seed-money/add"
  element={<SeedMoneyAdd />}
/>
<Route
  path="/criteria6/membership/view"
  element={<MembershipView />}
/>
<Route
  path="/criteria6/resource-person/view"
  element={<ResourcePersonView />}
/>
<Route
  path="/criteria6/participation/view"
  element={<ParticipationView />}
/>
<Route
  path="/criteria6/moocs/view"
  element={<MoocsView />}
/>
<Route
  path="/criteria6/fdp/view"
  element={<FdpView />}
/>
<Route
  path="/criteria6/student-project/view"
  element={<StudentProjectView />}
/>
<Route
  path="/criteria6/internship/view"
  element={<InternshipView />}
/>
<Route
path="/criteria6/academic-research/view"
element={<AcademicResearchView />}
/>


<Route
path="/criteria6/development-activities/view"
element={<DevelopmentActivityView />}
/>

<Route
path="/criteria6/sponsored-research/view"
element={<SponsoredResearchView />}
/>
<Route
  path="/criteria6/consultancy/view"
  element={<ConsultancyView />}
/>
<Route
  path="/criteria6/seed-money/view"
  element={<SeedMoneyView />}
/>
        </Routes>

      </div>

    </div>

    </Router>
  );
}

export default App;