import { Base } from './base';

export enum DocType {
  General,
  Note,
  Theological,
  Michaella,
}

export interface Post extends Base {
  docType?: string;
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
