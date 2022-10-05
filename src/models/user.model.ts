import { Document, Model, model, Types, Query } from 'mongoose';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
}, { collection: 'user' })

export interface IUserWithHashedPassword extends mongoose.Document {
  email: string;
  hashedPassword: string;
}

export const UserModel = mongoose.model<IUserWithHashedPassword>('user', userSchema);