import mongoose from 'mongoose';
export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    watchlist: string[];
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
