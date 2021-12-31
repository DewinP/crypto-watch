import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICoin, ISingleCoin } from "../../interfaces";
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
  }),
  tagTypes: ["Coin", "SingleCoin"],
  endpoints: (build) => {
    return {
      getAllCoinPrices: build.query<ICoin[], void>({
        query: () => ({
          url: `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
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
      getCoinPriceHistory: build.query<
        { prices: string[][] },
        { coin_id: string; range: string }
      >({
        query: ({ coin_id, range }) => ({
          url: `/coins/${coin_id}/market_chart?vs_currency=usd&days=${range}&interval=${
            range === "1" ? "hourly" : "daily"
          }`,
        }),
      }),
      getSingleCoinInfo: build.query<ISingleCoin, { coin_id: string }>({
        query: ({ coin_id }) => ({
          url: `/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`,
        }),
        providesTags: (result) =>
          result
            ? [
                {
                  type: "SingleCoin" as const,
                  id: result.id,
                },
              ]
            : ["SingleCoin"],
      }),
    };
  },
});

export const {
  useGetAllCoinPricesQuery,
  useGetCoinPriceHistoryQuery,
  useGetSingleCoinInfoQuery,
} = cryptoApi;
