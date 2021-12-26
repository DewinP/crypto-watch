import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ICoin,
  IFavoriteCoin,
  ILoginInput,
  ISignupInput,
} from "../../interfaces";
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
  }),
  tagTypes: ["Coin", "Me", "FavoriteCoin"],
  endpoints: (build) => {
    return {
      signupUser: build.mutation<{}, ISignupInput>({
        query: (input) => ({
          url: "users",
          method: "POST",
          body: input,
        }),
      }),
      loginUser: build.mutation<{}, ILoginInput>({
        query: (input) => ({
          url: "sessions",
          method: "POST",
          body: input,
          credentials: "include",
        }),
        invalidatesTags: ["Me"],
      }),
      getAllFavoriteCoins: build.query<IFavoriteCoin[], void>({
        query: () => ({
          url: "me/coins",
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
        query: (input) => ({
          url: `favorites"`,
          method: "POST",
          body: input,
          credentials: "include",
        }),
        invalidatesTags: (result) => [
          { type: "FavoriteCoin", id: "LIST" },
          { type: "FavoriteCoin", id: result.coin_id },
        ],
      }),
      deleteFavorite: build.mutation<IFavoriteCoin, { coin_id: string }>({
        query: ({ coin_id }) => ({
          url: `favorites/${coin_id}`,
          method: "DELETE",
          credentials: "include",
        }),
        invalidatesTags: () => [{ type: "FavoriteCoin", id: "LIST" }],
      }),
      getAllCoinPrices: build.query<ICoin[], void>({
        query: () => ({
          url: `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`,
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: "Coin" as const,
                  id: id,
                })),
                { type: "Coin" as const, id: "LIST" },
              ]
            : [{ type: "Coin" as const, id: "LIST" }],
      }),
    };
  },
});

export const {
  useGetAllCoinPricesQuery,
  useLoginUserMutation,
  useSignupUserMutation,
  useGetAllFavoriteCoinsQuery,
} = cryptoApi;
