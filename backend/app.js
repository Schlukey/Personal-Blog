"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Post = exports.DocTypes = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const baseUrl = process.env.BASEURL;
const postSchema = new mongoose_1.Schema({
    id: { type: String, default: uuid_1.v4 },
    title: String,
    docType: String,
    content: String,
    dateCreated: { type: Date, default: Date.now },
});
const docTypeSchema = new mongoose_1.Schema({
    id: { type: String, default: uuid_1.v4 },
    title: String,
});
exports.DocTypes = mongoose_1.default.model('DocTypes', docTypeSchema);
const port = 3000;
exports.Post = mongoose_1.default.model('Posts', postSchema);
mongoose_1.default.connect(baseUrl);
const db = mongoose_1.default.connection;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
db.once('open', function () { });
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
        const post = (yield exports.Post.findOne({ id: req.params.id }));
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
        const newPost = new exports.Post({
            title: req.body.title,
            docType: req.body.docType,
            content: req.body.content,
        });
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
    const postId = req.params.id;
    if (!postId) {
        return res
            .status(400)
            .json({ message: 'Invalid or missing post ID in the URL parameters' });
    }
    try {
        const post = yield exports.Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.json({ message: 'Post deleted' });
    }
    catch (e) {
        console.error('Error:', e);
        if (e instanceof Error) {
            return res.status(500).json({ message: e.message });
        }
        else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}));
app.listen(port, () => { });
