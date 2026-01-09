import Employee from "./employee.model";
import ApiError from "../utils/ApiError";

export const createEmployee = async (data: any) => {
  return Employee.create(data);
};

export const getEmployees = async () => {
  return Employee.find();
};

export const getEmployeeById = async (id: string) => {
  const emp = await Employee.findById(id);
  if (!emp) throw new ApiError(404, "Employee not found");
  return emp;
};

export const updateEmployee = async (id: string, data: any) => {
  const emp = await Employee.findByIdAndUpdate(id, data, { new: true });
  if (!emp) throw new ApiError(404, "Employee not found");
  return emp;
};

export const deleteEmployee = async (id: string) => {
  const emp = await Employee.findByIdAndDelete(id);
  if (!emp) throw new ApiError(404, "Employee not found");
};
