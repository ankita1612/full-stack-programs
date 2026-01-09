import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as service from "./employee.service";
import ApiError from "../utils/ApiError";

interface CreateEmployeeDto {
  name: string;
  email: string;
  salary: number;
}

export const createEmployee = async (req: Request, res: Response) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const formattedErrors = result.array().map((err) => {
      if ("param" in err) {
        return {
          field: String(err.param),
          message: String(err.msg)
        };
      }
      return { message: "Invalid value" };
    });

    throw new ApiError(422, "Validation failed", formattedErrors);
  }

  const body = req.body as CreateEmployeeDto;

  const employee = await service.createEmployee({
    name: body.name,
    email: body.email,
    salary: body.salary,
    profile_image: req.file?.path
  });

  res.status(201).json({
    message: "Employee created successfully",
    data: employee
  });
};

// 👇 THESE WERE MISSING 👇

export const getEmployees = async (_req: Request, res: Response) => {
  const employees = await service.getEmployees();
  res.status(200).json(employees);
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const employee = await service.getEmployeeById(req.params.id);
  res.status(200).json(employee);
};

export const updateEmployee = async (req: Request, res: Response) => {
  const employee = await service.updateEmployee(req.params.id, req.body);
  res.status(200).json(employee);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  await service.deleteEmployee(req.params.id);
  res.status(204).send();
};
