import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ParticipationView.css";

function ParticipationView() {
const navigate = useNavigate();
useEffect(() => {
    loadRecords();
}, []);
const [records, setRecords] = useState([]);
 const loadRecords = async () => {

    try {

        const res = await axios.get(
            "http://localhost:5000/api/participations"
        );

        setRecords(res.data);

    } catch (error) {

        console.log(error);

    }

};
const handleDelete = async (id) => {

    if (!window.confirm("Delete this record?")) return;

    try {

        await axios.delete(
            `http://localhost:5000/api/participations/${id}`
        );

        loadRecords();

    } catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

};

  return (

    <div className="participation-view">

      <div className="view-header">

        <h2>
          Faculty Members Participation in STTPs / FDPs
        </h2>

        <button
          className="add-btn"
          onClick={() =>
            navigate("/criteria6/participation/add")
          }
        >
          + Add New
        </button>

      </div>

      <table className="participation-table">
<thead>
  <tr>
    <th>Sr No</th>
    <th>Faculty Name</th>
    <th>Program Name</th>
    <th>Organization</th>
    <th>Duration</th>
    <th>Certificate No.</th>
    <th>Document</th>
    <th>Action</th>
  </tr>
</thead>

        <tbody>

{records.length === 0 ? (

<tr>
  <td colSpan="8">
    No Records Found
  </td>
</tr>

) : (

records.map((item, index) => (

<tr key={item.id}>

  <td>{index + 1}</td>

  <td>{item.faculty_name}</td>

  <td>{item.programme_name}</td>

  <td>{item.organization}</td>

  <td>{item.venue}</td>

  <td>{item.academic_year}</td>

  <td>
    {item.document ? "Uploaded" : "-"}
  </td>

  <td>
    <button
      className="action-btn delete-btn"
      onClick={() => handleDelete(item.id)}
    >
      🗑
    </button>
  </td>

</tr>

))

)}

</tbody>

      </table>

      <div className="bottom-buttons">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/criteria6/faculty-development")
          }
        >
          ← Back
        </button>

      </div>

    </div>

  );

}

export default ParticipationView;