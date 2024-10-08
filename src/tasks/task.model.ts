import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  planning: { type: String, default: '' },
  done: { type: Boolean, default: false },
});

export interface Task extends mongoose.Document {
  id: string;
  title: string;
  planning: string;
  done: boolean;
}
