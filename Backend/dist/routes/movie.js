"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const Movie_1 = __importDefault(require("../models/Movie"));
const router = express_1.default.Router();
// Get all movies
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield Movie_1.default.find();
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching movies' });
    }
}));
// Get movie by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield Movie_1.default.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching movie' });
    }
}));
// Add movie to database
router.post('/', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, overview, posterPath, releaseDate, voteAverage, tmdbId } = req.body;
        // Check if movie already exists
        const existingMovie = yield Movie_1.default.findOne({ tmdbId });
        if (existingMovie) {
            return res.status(400).json({ message: 'Movie already exists' });
        }
        const movie = new Movie_1.default({
            title,
            overview,
            posterPath,
            releaseDate,
            voteAverage,
            tmdbId,
        });
        yield movie.save();
        res.status(201).json(movie);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding movie' });
    }
}));
exports.default = router;
//# sourceMappingURL=movie.js.map