import axios from 'axios';
import { EditPostForm, PostForm } from '../models/post';

const baseURL = 'http://localhost:3000';

const api = axios.create({
  baseURL,
});

export const savePostTrigger = async (formData: PostForm) => {
  return api.post('/posts/create', formData);
};

export const findAllPosts = async () => {
  return api.get('/posts');
};

export const findPostById = async (id: string) => {
  const url = id ? `/posts/${id}` : '/items';
  return api.get(url);
};

export const updatePostTrigger = async (id: string, data: EditPostForm) => {
  return api.put(`/posts/update/${id}`, data);
};

export const deletePostTrigger = async (id: string) => {
  return api.delete(`/items/delete/${id}`);
};

export default api;
