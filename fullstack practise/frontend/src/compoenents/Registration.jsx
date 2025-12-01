import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be minimum 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [serverMsg, setServerMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/register", data);
      setServerMsg(res.data.message);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Server Error");
      setServerMsg("");
    }
  };

  return (<>{/* HEADER */}
      <header className="bg-primary text-white p-3">
        <h2 className="text-center">My Company</h2>
      </header>

      {/* MAIN CONTENT */}
      <div className="container mt-4">

        {/* PAGE TITLE + ADD BUTTON */}
        <div className="row mb-3">
          <div className="col-md-6">
            <h3>Employee List</h3>
          </div>
          <div className="col-md-6 text-end">
            <button className="btn btn-success">+ Add Employee</button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search employee"
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100">Search</button>
          </div>
        </div>

        {/* LISTING TABLE */}
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th width="150">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ankita</td>
                  <td>ankita@example.com</td>
                  <td>Developer</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>Krisha</td>
                  <td>krisha@example.com</td>
                  <td>Designer</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="row">
          <div className="col-md-12">
            <nav>
              <ul className="pagination justify-content-center">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-light text-center p-3 mt-4">
        © 2025 My Company. All Rights Reserved.
      </footer>
    </>);
};

export default RegistrationForm;
