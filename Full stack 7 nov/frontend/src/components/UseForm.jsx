import React, { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";

export default function UseForm() {
    const [cnt, setCnt]= useState(0)
    console.log("rerender")
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "onChange", // so isDirty and isValid update immediately
  });

  const onSubmit = async (data) => {
    console.log(data);

    // Fake API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  };
  //const addstyle = useCallback(() =>{
    const addstyle = useMemo(() =>{
        console.log("style render")
        return {color:"pink"}
    },[])
//const style = useMemo(() => ({ color: "pink" }), []);

  return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>React Hook Form Example</h2>

      {/* NAME FIELD */}
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Enter Name"
      />
      <p style={{ color: "red" }}>{errors.name?.message}</p>

      {/* EMAIL FIELD */}
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
        })}
        placeholder="Enter Email"
      />
      <p style={{ color: "red" }}>{errors.email?.message}</p>

      {/* BUTTON */}
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <strong>Form State:</strong>
        <p>isDirty: {isDirty ? "Yes" : "No"}</p>
        <p>isValid: {isValid ? "Yes" : "No"}</p>
        <p>isSubmitting: {isSubmitting ? "Yes" : "No"}</p>
      </div>
    </form>
        <div style={{color:"red"}}>hai</div>
        <div style={addstyle}>bye</div>
        <div>{cnt}</div>
        <button onClick={()=>setCnt(()=>cnt+1)}>click me</button>
    </>
  );
}
