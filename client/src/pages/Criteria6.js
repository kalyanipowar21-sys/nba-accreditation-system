import React from "react";
import "./Criteria6.css";

function Criteria6() {
  return (
    <div className="criteria6-container">

      <div className="criteria6-header">
        <h2>Criterion 6</h2>
        <p>Faculty Performance & Contributions</p>
      </div>

      {/* Filter Section */}

      <div className="criteria6-filter">

        <select>
          <option>Academic Year</option>
          <option>2025-26</option>
          <option>2024-25</option>
        </select>

        <select>
          <option>Department</option>
          <option>MCA</option>
          <option>CSE</option>
        </select>

        <select>
          <option>Semester</option>
          <option>I</option>
          <option>II</option>
        </select>

      </div>
{/* ===========================
      6.1.1
=========================== */}

<div className="criteria-card">

    <div className="criteria-card-header">

        <div>

            <h3>
                6.1.1 Memberships in Professional Societies at National /
                International Levels
            </h3>

            <p>
                Upload membership details and supporting documents.
            </p>

        </div>

        <div className="action-buttons">

            <button className="view-btn">
                👁 View
            </button>

            <button className="add-btn">
                + Add
            </button>

        </div>

    </div>

</div>
    </div>
    
  );
}

export default Criteria6;