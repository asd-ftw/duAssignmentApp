import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, BASE_URL } from '../utils/constants';

interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getPopularMovies: builder.query<MovieListResponse, { page: number }>({
      query: ({ page = 1 }) =>
        `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
      // Automatically merge results when page changes
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName; // Only one cache entry for 'getPopularMovies'
      },
      merge: (currentCache, newItems) => {
        // Only merge if the new page is different from the current one
        if (currentCache.page !== newItems.page) {
          currentCache.results.push(...newItems.results);
          currentCache.page = newItems.page; // Update the current page
        }
        // Keep total_pages and total_results from the latest fetch
        currentCache.total_pages = newItems.total_pages;
        currentCache.total_results = newItems.total_results;
      },
      // Refetch if the network status changes or the app regains focus
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    // Add other endpoints here (e.g., getMovieDetails) if needed
  }),
});

// Export hooks for usage in functional components
export const { useGetPopularMoviesQuery } = movieApi;
