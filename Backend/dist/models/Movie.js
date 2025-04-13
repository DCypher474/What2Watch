"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('Movie', movieSchema);
//# sourceMappingURL=Movie.js.map