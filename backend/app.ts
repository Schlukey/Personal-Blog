import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const baseUrl: string = process.env.BASEURL!;

const postSchema = new mongoose.Schema({
  dateCreated: new Date(),
  title: String,
  topic: String,
  body: String,
});

const port = 3000;

export const Post = mongoose.model('Posts', postSchema);

mongoose.connect(baseUrl);

const db = mongoose.connection;
const app = express();
app.use(express.json());
app.use(cors())
db.once('open', function () {
  console.log("We're connected to MongoDB!");
});

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
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (e) {
    if (e instanceof Error) {
        res.status(500).json({ message: e.message });
      }
  }
});

app.post('/posts/create', async (req, res) => {
  try {
    const newPost = new Post(req.body);
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
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (e) {
    console.log('error:', e);
    if (e instanceof Error) {
        res.status(500).json({ message: e.message });
      }
  }
});

app.listen(port, () => {
  console.log('blog server up');
  console.log('listening on port', port)
});
