import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FdpView.css";
function FdpView() {

  const navigate = useNavigate();
const [records, setRecords] = useState([]);

useEffect(() => {
    loadRecords();
}, []);

const loadRecords = async () => {

    const res = await axios.get(
        "http://localhost:5000/api/fdp-records"
    );

    setRecords(res.data);

};

const handleDelete = async (id) => {

    if (!window.confirm("Delete this record?")) return;

    await axios.delete(
        `http://localhost:5000/api/fdp-records/${id}`
    );

    loadRecords();

};
  return (

    <div className="fdp-view">

      <div className="view-header">

        <h2>FDP / STTP Organized by the Department</h2>

        <button
          className="add-btn"
          onClick={() => navigate("/criteria6/fdp/add")}
        >
          + Add New
        </button>

      </div>

      <table className="fdp-table">
<thead>
<tr>
<th>Sr No</th>
<th>Program Name</th>
<th>Coordinator Name</th>
<th>Start Date</th>
<th>End Date</th>
<th>No. of Participants</th>
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

records.map((item,index)=>(

<tr key={item.id}>

<td>{index+1}</td>

<td>{item.program_name}</td>

<td>{item.coordinator_name}</td>

<td>{item.start_date?.substring(0,10)}</td>

<td>{item.end_date?.substring(0,10)}</td>

<td>{item.participants}</td>

<td>{item.document ? "Uploaded" : "-"}</td>

<td>

<button
className="action-btn delete-btn"
onClick={()=>handleDelete(item.id)}
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
            navigate("/criteria6/faculty-activities")
          }
        >
          ← Back
        </button>

      </div>

    </div>

  );

}

export default FdpView;