import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { I_Repo, I_ServerResponse, I_User } from 'models/models'

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<I_User[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: I_ServerResponse<I_User>) => response.items,
    }),
    getUserRepos: build.query<I_Repo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
})

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi