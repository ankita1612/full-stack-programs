import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeRow from "./EmployeeRow";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdInformationCircle } from "react-icons/io";

// ✅ Yup validation schema
const employeeSchema = yup.object({
  name: yup.string().required("Name is required").max(100, "Max 100 characters allowed"),
  email: yup.string().email("Invalid email").required("Email is required"),
  salary: yup
    .number()
    .typeError("Salary must be a number")
    .required("Salary is required")
    .positive("Salary must be > 0")
    .max(1000000, "Salary must be less than 1,000,000"),
  dob: yup
    .date()
    .typeError("Invalid date")
    .max(new Date(), "DOB must be smaller than today's date")
    .required("Date of Birth is required"),
  salary_slip: yup
    .mixed()
    .test("fileType", "Salary slip must be a PDF", (value) => {
      if (!value || value.length === 0) return true; // optional field
      return value[0].type === "application/pdf";
    }),
  profile_image: yup
    .mixed()
    .required("Profile image is required")
    .test("fileType", "Only JPG or JPEG allowed", (value) => {
      return value && value[0] && ["image/jpeg", "image/jpg"].includes(value[0].type);
    }),
  description: yup.string().required("Description is required"),
});

export default function EmployeeList() {
  const backend_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [message, setMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // 🧾 React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  //debounce
  useEffect(() => {
    console.log("first")
    const timer = setTimeout(() => fetchEmployees(), 5000);
    return () => clearTimeout(timer);
  }, [search, limit, page, sortField, sortOrder]);

  // 🧠 Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${backend_url}/employee`, {
        params: { search, limit, page, sortField, sortOrder },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setEmployees(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, limit, page, sortField, sortOrder]);

  // 🗑 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      const res = await axios.delete(`${backend_url}/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleRowSave(res.data?.message || "Employee deleted successfully!");
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  // 🧩 After save/delete/update
  const handleRowSave = (msg) => {
    setMessage(msg);
    fetchEmployees();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // ➕ Add Employee API
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "salary_slip" || key === "profile_image") {
          if (data[key]?.length > 0) formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await axios.post(`${backend_url}/employee`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data?.message || "Employee added successfully!");
      fetchEmployees();
      reset();
      setShowAddForm(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Employee List</h2>
      <IoMdInformationCircle color="green" />
      {message && <div className="success-message">{message}</div>}

      {/* 🔍 Search + Add Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Search by name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <label>Show:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>

          <button onClick={() => {setShowAddForm(!showAddForm);reset()}}>
            {showAddForm ? "Close" : "Add Employee"}
          </button>
        </div>
      </div>

      {/* 🧾 Add Employee Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            marginBottom: "2rem",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <div>
            <label>Name:</label>
            <input type="text" {...register("name")} />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div>
            <label>Email:</label>
            <input type="text" {...register("email")} />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div>
            <label>Salary:</label>
            <input type="number" {...register("salary")} />
            {errors.salary && <p className="error-message">{errors.salary.message}</p>}
          </div>

          <div>
            <label>DOB:</label>
            <input type="date" {...register("dob")} />
            {errors.dob && <p className="error-message">{errors.dob.message}</p>}
          </div>

          <div>
            <label>Salary Slip (PDF):</label>
            <input type="file" accept="application/pdf" {...register("salary_slip")} />
            {errors.salary_slip && (
              <p className="error-message">{errors.salary_slip.message}</p>
            )}
          </div>

          <div>
            <label>Profile Image (JPEG):</label>
            <input type="file" accept="image/jpeg,image/jpg" {...register("profile_image")} />
            {errors.profile_image && (
              <p className="error-message">{errors.profile_image.message}</p>
            )}
            {/* ✅ Preview */}
            {watch("profile_image")?.length > 0 && (
              <img
                src={URL.createObjectURL(watch("profile_image")[0])}
                alt="Preview"
                width="50"
                style={{ marginTop: "5px", borderRadius: "4px" }}
              />
            )}
          </div>

          <div>
            <label>Description:</label>
            <textarea {...register("description")} rows="3" />
            {errors.description && (
              <p className="error-message">{errors.description.message}</p>
            )}
          </div>

          <button type="submit">Save Employee</button>
        </form>
      )}

      {/* 📋 Employee Table */}
      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : "⬍"}</th>
            <th onClick={() => handleSort("email")}>Email {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : "⬍"}</th>
            <th onClick={() => handleSort("salary")}>Salary {sortField === "salary" ? (sortOrder === "asc" ? "↑" : "↓") : "⬍"}</th>
            <th>DOB</th>
            <th>Status</th>
            <th>Salary Slip</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <EmployeeRow
                key={emp._id}
                emp={emp}
                onDelete={handleDelete}
                onSave={handleRowSave}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" align="center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔢 Pagination */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
  <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setPage(i + 1)}
      style={{ fontWeight: page === i + 1 ? "bold" : "normal" }}
    >
      {i + 1}
    </button>
  ))}
  <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
