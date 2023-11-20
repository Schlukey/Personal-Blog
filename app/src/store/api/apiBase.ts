import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

const baseUrl = process.env.API_BASE;

export const AppFetchBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/`,
  prepareHeaders: (headers, { getState }) => {
    // include token in req header
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    return headers;
  },
});
