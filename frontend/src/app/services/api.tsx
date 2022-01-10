import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IFavoriteCoin,
  ILoginInput,
  ISessionPayload,
  ISignupInput,
  IUser,
} from "../../interfaces";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`,
    prepareHeaders: (headers) => {
      headers.set("x-access-token", localStorage.getItem("accessToken"));
      headers.set("x-refresh-token", localStorage.getItem("refreshToken"));

      return headers;
    },
  }),
  tagTypes: ["Me", "FavoriteCoin"],
  endpoints: (build) => {
    return {
      logout: build.mutation<{}, void>({
        query: () => ({
          url: "sessions",
          method: "DELETE",
          credentials: "include",
        }),
      }),
      me: build.query<IUser, void>({
        query: () => ({
          url: "me",
          credentials: "include",
        }),
        providesTags: ["Me"],
      }),
      signupUser: build.mutation<{}, ISignupInput>({
        query: (input) => ({
          url: "users/signup",
          method: "POST",
          body: input,
        }),
      }),
      loginUser: build.mutation<ISessionPayload, ILoginInput>({
        query: (input) => ({
          url: "sessions",
          method: "POST",
          body: input,
          credentials: "include",
        }),
        invalidatesTags: [{ type: "Me" }, { type: "FavoriteCoin", id: "LIST" }],
      }),
      getAllFavoriteCoins: build.query<IFavoriteCoin[], void>({
        query: () => ({
          url: "likes",
          method: "GET",
          credentials: "include",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ coin_id }) => ({
                  type: "FavoriteCoin" as const,
                  id: coin_id,
                })),
                { type: "FavoriteCoin" as const, id: "LIST" },
              ]
            : [{ type: "FavoriteCoin" as const, id: "LIST" }],
      }),
      createFavorite: build.mutation<IFavoriteCoin, { coin_id: string }>({
        query: ({ coin_id }) => ({
          url: `likes/${coin_id}`,
          method: "POST",
          credentials: "include",
        }),
        invalidatesTags: (result) => [
          { type: "FavoriteCoin", id: "LIST" },
          { type: "FavoriteCoin", id: result?.coin_id },
        ],
      }),
      deleteFavorite: build.mutation<IFavoriteCoin, { coin_id: string }>({
        query: ({ coin_id }) => ({
          url: `likes/${coin_id}`,
          method: "DELETE",
          credentials: "include",
        }),
        invalidatesTags: () => [{ type: "FavoriteCoin", id: "LIST" }],
      }),
    };
  },
});

export const {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
  useLoginUserMutation,
  useSignupUserMutation,
  useMeQuery,
  useLogoutMutation,
  useGetAllFavoriteCoinsQuery,
} = api;
