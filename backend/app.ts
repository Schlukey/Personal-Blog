import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { Document, Schema } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const baseUrl: string = process.env.BASEURL!;

interface Post extends Document {
  id: string;
  dateCreated: Date;
  title: string;
  docType: string;
  content: string;
}

interface DocType extends Document {
  id: string;
  title: string;
}

const postSchema = new Schema<Post>({
  id: { type: String, default: uuidv4 },
  title: String,
  docType: String,
  content: String,
  dateCreated: { type: Date, default: Date.now },
});

const docTypeSchema = new Schema<DocType>({
  id: { type: String, default: uuidv4 },
  title: String,
});

export const DocTypes = mongoose.model('DocTypes', docTypeSchema);

const port = 3000;

export const Post = mongoose.model('Posts', postSchema);

mongoose.connect(baseUrl);

const db = mongoose.connection;
const app = express();
app.use(express.json());
app.use(cors());
db.once('open', function () {});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = (await Post.findOne({ id: req.params.id })) as Post;
    res.json(post);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
  }
});

app.post('/posts/create', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      docType: req.body.docType,
      content: req.body.content,
    });
    await newPost.save();
    res.json(newPost);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
  }
});

app.put('/posts/update/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
  }
});

app.delete('/posts/delete/:id', async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res
      .status(400)
      .json({ message: 'Invalid or missing post ID in the URL parameters' });
  }
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json({ message: 'Post deleted' });
  } catch (e) {
    console.error('Error:', e);
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

app.listen(port, () => {});
