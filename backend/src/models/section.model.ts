import mongoose, { Schema, Document } from 'mongoose';

export interface ISection extends Document {
  _id: string;
  title: string;
  dateCreated: Date;
  boardId: string;
  order: number;
}

const SectionSchema: Schema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  dateCreated: { type: String, required: true },
  boardId: { type: String, required: true },
  order: { type: Number, required: true },
});

export default mongoose.model<ISection>('Section', SectionSchema);
