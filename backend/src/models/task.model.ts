import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  _id: string;
  title: string;
  dateCreated: Date;
  boardId: string;
  sectionId: string;
  order: number;
}

const TaskSchema: Schema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  dateCreated: { type: String, required: true },
  boardId: { type: String, required: true },
  sectionId: { type: String, required: true },
  order: { type: Number, required: true },
});

export default mongoose.model<ITask>('Task', TaskSchema);
