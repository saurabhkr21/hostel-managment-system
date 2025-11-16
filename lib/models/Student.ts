import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  id: string;
  name: string;
  studentId: string;
  email: string;
  department: string;
  year: number;
  roomNumber: string;
  roomBlock: string;
  phone: string;
  avatar: string;
  alt: string;
  attendanceStatus: "present" | "absent" | "late" | "on-leave";
  lastActivity: string;
  parentContact: boolean;
  joinDate: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  medicalInfo: {
    bloodGroup: string;
    allergies: string[];
    medications: string[];
  };
}

const StudentSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    roomNumber: { type: String, required: true },
    roomBlock: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required: true },
    alt: { type: String, required: true },
    attendanceStatus: {
      type: String,
      enum: ["present", "absent", "late", "on-leave"],
      required: true,
    },
    lastActivity: { type: String, required: true },
    parentContact: { type: Boolean, required: true },
    joinDate: { type: String, required: true },
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    medicalInfo: {
      bloodGroup: { type: String, required: true },
      allergies: [{ type: String }],
      medications: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model<IStudent>("Student", StudentSchema);
