import { Base } from './base';

export interface DocType extends Base {
  title: string;
}

export interface DocTypeFormData {
  title: string;
}

export interface EditDocTypeForm extends DocTypeFormData {
  id: string;
}

export interface Post extends Base {
  docType?: DocType;
  title: string;
  content: string;
}

export interface PostForm {
  docType?: string;
  title: string;
  content: string;
}

export interface EditPostForm extends PostForm {
  id: string;
}
