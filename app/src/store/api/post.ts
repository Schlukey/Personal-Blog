import { createApi } from '@reduxjs/toolkit/query/react';
import { Post, PostForm, EditPostForm } from '../../models/post';
import { AppFetchBaseQuery } from './apiBase';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: AppFetchBaseQuery,
  endpoints: (build) => ({
    fetchAllPosts: build.query<Post[], any>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
    fetchPostById: build.query<Post, string>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
    createPost: build.mutation<Post, PostForm>({
      query: (body) => ({
        url: '/posts/create',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: Post) => {
        return response;
      },
    }),
    updatePost: build.mutation<Post, EditPostForm>({
      query: (body) => ({
        url: `/posts/update/${body.id}`,
        method: 'PUT',
        body: body,
      }),
      transformResponse: (response: Post) => {
        return response;
      },
    }),
    deletePost: build.mutation<string, string>({
      query: (id) => ({
        url: `/posts/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useFetchPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
