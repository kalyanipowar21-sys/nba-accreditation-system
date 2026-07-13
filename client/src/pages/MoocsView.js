import { useNavigate } from "react-router-dom";
import React,{useEffect,useState} from "react";
import axios from "axios";
import "./MoocsView.css";

function MoocsView() {
 
const [records,setRecords]=useState([]);
 const navigate = useNavigate();
useEffect(()=>{
    loadRecords();
},[]);

const loadRecords = async()=>{

   const res=await axios.get(
      "http://localhost:5000/api/moocs"
   );

   setRecords(res.data);

};

const handleDelete = async(id)=>{

   if(!window.confirm("Delete Record?")) return;

   await axios.delete(
      `http://localhost:5000/api/moocs/${id}`
   );

   loadRecords();

};
  return (

    <div className="moocs-view">

      <div className="view-header">

        <h2>
          Faculty Certification of MOOCs through SWAYAM
        </h2>

        <button
          className="add-btn"
          onClick={() => navigate("/criteria6/moocs/add")}
        >
          + Add New
        </button>

      </div>

      <table className="moocs-table">

       <thead>

<tr>

<th>Sr No</th>
<th>Faculty Name</th>
<th>Course Name</th>
<th>Platform</th>
<th>Duration</th>
<th>Certificate No.</th>
<th>Document</th>
<th>Action</th>

</tr>

</thead>
        <tbody>

{records.length===0 ?(

<tr>

<td colSpan="8">

No Records Found

</td>

</tr>

):(

records.map((item,index)=>(

<tr key={item.id}>

<td>{index+1}</td>

<td>{item.faculty_name}</td>

<td>{item.course_name}</td>

<td>{item.platform}</td>

<td>{item.duration}</td>

<td>{item.certificate_number}</td>

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
          onClick={() => navigate("/criteria6/faculty-development")}
        >
          ← Back
        </button>

      </div>

    </div>

  );

}

export default MoocsView;