import { Schema, model } from 'mongoose';

const TodoSchema = new Schema({
  title: { type: String, unique: true, required: true },
}, { versionKey: false });

export default model('Todo', TodoSchema);