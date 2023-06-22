import mongoose, { Schema, Document } from 'mongoose';

export interface IBoard extends Document {
  _id: string;
  title: string;
  description: string;
  //   dateCreated: string;
}

const BoardSchema: Schema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  //   dateCreated: { type: String, required: true },
});

export default mongoose.model<IBoard>('Board', BoardSchema);
