/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    indexe: [{ unique: true }],
  },

  password: {
    type: String,
    required: true,
  },
});
