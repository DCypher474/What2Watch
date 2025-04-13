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
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Get user profile
router.get('/profile', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
}));
// Update user profile
router.put('/profile', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = req.body;
        const user = yield User_1.default.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        yield user.save();
        res.json({ message: 'Profile updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
}));
// Add movie to watchlist
router.post('/watchlist/:movieId', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const movieId = req.params.movieId;
        if (user.watchlist.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in watchlist' });
        }
        user.watchlist.push(movieId);
        yield user.save();
        res.json({ message: 'Movie added to watchlist' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding movie to watchlist' });
    }
}));
// Remove movie from watchlist
router.delete('/watchlist/:movieId', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const movieId = req.params.movieId;
        user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
        yield user.save();
        res.json({ message: 'Movie removed from watchlist' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error removing movie from watchlist' });
    }
}));
// Get user's watchlist
router.get('/watchlist', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.userId)
            .populate('watchlist')
            .select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.watchlist);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching watchlist' });
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map