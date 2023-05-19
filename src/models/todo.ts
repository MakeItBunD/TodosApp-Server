import { Schema, model } from 'mongoose';

const TodoSchema = new Schema({
  title: { type: String, unique: true, required: true },
  isCompleted: { type: Boolean, required: true, default: false },
}, { versionKey: false });

export default model('Todo', TodoSchema);