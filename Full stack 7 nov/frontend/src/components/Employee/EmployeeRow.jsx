import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatCurrency, formatDateYMD } from "../../utils/format";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdPictureAsPdf } from "react-icons/md";

const employeeSchema = (backend_url, emp, token) => yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test("unique-email", "Email already exists", async (value) => {
      if (!value || value === emp.email) return true;
      const res = await axios.get(`${backend_url}/employee/check-email/${value}?excludeId=${emp._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return !res.data.exists;
    }),
  salary: yup.number().typeError("Salary must be a number").positive("Salary must be > 0").max(1000000, "Salary must be < 1,000,000").required(),
  dob: yup.date().max(new Date(), "DOB must be before today").required(),
  status: yup.string().oneOf(["Active","Inactive"]).required(),
  salary_slip: yup.mixed().notRequired().test("fileType", "Only PDF allowed",
    (file) => !file || file.length === 0 || file[0].type === "application/pdf"),
  profile_image: yup.mixed().notRequired().test("fileType", "Only JPG/JPEG allowed", 
    file => !file?.length || ["image/jpeg", "image/jpg"].includes(file[0].type))
});


function EmployeeRow({ emp, onDelete, onSave, token }) {
  const [cntr, setCntr] = useState(1)
  const incr= ()=>{setCntr ((prev)=>prev+1)   }
  console.log("rerender")
  const backend_url = import.meta.env.VITE_API_URL;
  const [editMode, setEditMode] = useState(false);
  
  // ✅ Initialize form
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(employeeSchema(backend_url, emp, token)),
    defaultValues: { name: emp.name, email: emp.email, salary: emp.salary, dob: emp.dob?.substring(0,10), status: emp.status, salary_slip: null, profile_image: null },
  });

  // ✅ Submit handler
  const onSubmit = async (formData) => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "salary_slip" && key !== "profile_image") data.append(key, formData[key]);
      });

      // Add files if present
      if (formData.salary_slip?.[0]) data.append("salary_slip", formData.salary_slip[0]);
      if (formData.profile_image?.[0]) data.append("profile_image", formData.profile_image[0]);

      const res = await axios.put(`${backend_url}/employee/${emp._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditMode(false);
      onSave(res.data?.message || "Employee updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating employee");
    }
  };

  return (
    <tr>
      {/* NAME */}
      <td>{cntr}<input type="range" value={cntr}  onChange={(e) => setCntr(e.target.value)}/>
      <button onClick={incr}>+</button>


        {editMode ? (
          <>
            <input type="text" {...register("name")} />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </>
        ) : (
          emp.name
        )}
      </td>

      {/* EMAIL */}
      <td>
        {editMode ? (
          <>
            <input type="email" {...register("email")} />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </>
        ) : (
          emp.email
        )}
      </td>

      {/* SALARY */}
      <td>
        {editMode ? (
          <>
            <input type="number" {...register("salary")} />
            {errors.salary && <p className="error-message">{errors.salary.message}</p>}
          </>
        ) : (
          formatCurrency(emp.salary)
        )}
      </td>

      {/* DOB */}
      <td>
        {editMode ? (
          <>
            <input type="date" {...register("dob")} />
            {errors.dob && <p className="error-message">{errors.dob.message}</p>}
          </>
        ) : (
          formatDateYMD(emp.dob)
        )}
      </td>

      {/* STATUS */}
      <td>
        {editMode ? (
          <>
            <label>
              <input type="radio" value="Active" {...register("status")} /> Active
            </label>
            <label>
              <input type="radio" value="Inactive" {...register("status")} /> Inactive
            </label>
            {errors.status && <p className="error-message">{errors.status.message}</p>}
          </>
        ) : emp.status === "Active" ? (
          <>
            <FaCheckCircle color="green" /> Active
          </>
        ) : (
          <>
            <FaTimesCircle color="red" /> Inactive
          </>
        )}
      </td>

      {/* SALARY SLIP */}
      <td>
        {editMode ? (
          <>
            <input type="file" accept="application/pdf" {...register("salary_slip")} />
            {errors.salary_slip && (
              <p className="error-message">{errors.salary_slip.message}</p>
            )}
          </>
        ) : emp.salary_slip ? (
          <>
            <a href={`${backend_url}/${emp.salary_slip}`} target="_blank" 
              rel="noopener noreferrer"  title="View Salary Slip"
            >
              <MdPictureAsPdf size={24} color="red" style={{ verticalAlign: "middle", cursor: "pointer" }} />
            </a>
          </>
        ) : (
          "No file"
        )}
        <br/>[{emp.salary_slip}]
      </td>
{/* Profile image */}
      <td>
        {editMode ? (
          <>
            <input type="file" accept="image/jpeg,image/jpg" {...register("profile_image")} />
            {errors.profile_image && (
              <p className="error-message">{errors.profile_image.message}</p>
            )}
          </>
        ) : emp.profile_image ? (          
           <img   src={`${backend_url}/${emp.profile_image}`}  alt="Profile"  width="80"  height="80"/>
        ) : (
          "No file"
        )}

        {editMode && watch("profile_image")?.length > 0 && (
          <img src={URL.createObjectURL(watch("profile_image")[0])} alt="Preview" width="80" height="80" />
        )}
         {emp.profile_image}
      </td>
      {/* ACTIONS */}
      <td>
        {editMode ? (
          <>
            <button onClick={handleSubmit(onSubmit)}>Save</button>
            <button onClick={() => {setEditMode(false); reset({...emp, profile_image: null, salary_slip: null });}}>  Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={() => onDelete(emp._id)}>Delete</button>
          </>
        )}
        <br />
       
      </td>
    </tr>
  );
}

export default React.memo(EmployeeRow);
