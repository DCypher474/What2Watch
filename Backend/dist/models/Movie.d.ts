import mongoose from 'mongoose';
export interface IMovie extends mongoose.Document {
    title: string;
    overview: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    tmdbId: number;
}
declare const _default: mongoose.Model<IMovie, {}, {}, {}, mongoose.Document<unknown, {}, IMovie> & IMovie & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
