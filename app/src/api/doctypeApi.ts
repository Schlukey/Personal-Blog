import axios from 'axios';
import { EditDocTypeForm, DocTypeFormData } from '../models/post';

const baseURL = 'http://localhost:3000';

const api = axios.create({
  baseURL,
});

export const findAllDocTypes = async () => {
  return api.get('/doctype');
};

export const findDocById = async (id: string) => {
  const url = id ? `/doctype/${id}` : '/doctype';
  return api.get(url);
};

export const saveDocTypeTrigger = async (formData: DocTypeFormData) => {
  return api.post('/doctype/create', formData);
};

export const updateDocTypeTrigger = async (id: string, data: EditDocTypeForm) => {
  return api.put(`/doctype/update/${id}`, data);
};

export const deleteDocTypeTrigger = async (id: string) => {
  try {
    const response = await api.delete(`/doctype/delete/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
