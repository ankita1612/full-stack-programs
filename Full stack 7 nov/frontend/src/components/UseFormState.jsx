import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// -------------------
// YUP VALIDATION SCHEMA
// -------------------
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required(),
});

export default function UseFormState() {
  console.log("Rerender")
  // -------------------
  // useForm
  // -------------------
  const {
    register,
    handleSubmit,
    control,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // enables isValid updates
  });

  // -------------------
  // useFormState
  // -------------------
  const { errors, isDirty, isValid, isSubmitting } = useFormState({
    control,
  });

  // -------------------
  // Submit Handler
  // -------------------
  const onSubmit = async (data) => {
    console.log(data);
    await new Promise((res) => setTimeout(res, 1500)); // simulate API
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: 300 }}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
        <p style={{ color: "red" }}>{errors.name?.message}</p>
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
      </div>

      <button
        type="submit"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
