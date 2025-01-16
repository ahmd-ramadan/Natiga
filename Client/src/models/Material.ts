import mongoose, { Document, Schema } from 'mongoose';

export interface IMaterial extends Document {
  name: string;
  code: string;
  year: number;
  place: number;
  ar: number;
  en: number;
  ma: number;
  sc: number;
  si: number;
}

const materialSchema: Schema = new mongoose.Schema({
    year: {
      type: Number,
      required: true,
    },
    percent: {
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
      required:  true,
    },
    so: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  });

export default mongoose.models.Material || mongoose.model<IMaterial>('Material', materialSchema);