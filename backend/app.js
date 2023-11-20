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
exports.Post = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const baseUrl = process.env.BASEURL;
const postSchema = new mongoose_1.default.Schema({
    title: String,
    topic: String,
    body: String,
});
exports.Post = mongoose_1.default.model('Posts', postSchema);
mongoose_1.default.connect(baseUrl);
const db = mongoose_1.default.connection;
const app = (0, express_1.default)();
app.use(express_1.default.json());
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected to MongoDB!");
});
app.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield exports.Post.find();
        res.json(posts);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
        }
    }
}));
app.get('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield exports.Post.findById(req.params.id);
        res.json(post);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
        }
    }
}));
app.post('/posts/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = new exports.Post(req.body);
        yield newPost.save();
        res.json(newPost);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
        }
    }
}));
app.put('/posts/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield exports.Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(post);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
        }
    }
}));
app.delete('/posts/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield exports.Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    }
    catch (e) {
        console.log('error:', e);
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
        }
    }
}));
app.listen(3000, () => {
    console.log('blog server up');
});
