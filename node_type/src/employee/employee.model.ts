import { Schema, model, Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  salary: number;
  profile_image?: string;
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salary: { type: Number, required: true },
    profile_image: { type: String }
  },
  { timestamps: true }
);

export default model<IEmployee>("Employee", employeeSchema);
