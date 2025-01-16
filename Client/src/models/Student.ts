import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  code: string;
  year: number;
  place: number;
  ar: number;
  en: number;
  ma: number;
  sc: number;
  so: number;
}

const studentSchema: Schema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    place: {
      type: Number,
      required: true
    },
    ar: {
      type: Number,
      required: true,
    },
    en: {
      type: Number,
      required: true,
    },
    ma: {
      type: Number,
      required: true,
    },
    sc: {
      type: Number,
      required: true,
    },
    so: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  });

export default mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);