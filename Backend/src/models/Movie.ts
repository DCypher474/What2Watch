import mongoose from 'mongoose';

export interface IMovie extends mongoose.Document {
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  tmdbId: number;
}

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  voteAverage: {
    type: Number,
    required: true,
  },
  tmdbId: {
    type: Number,
    required: true,
    unique: true,
  },
}, {
  timestamps: true
});

export default mongoose.model<IMovie>('Movie', movieSchema); 