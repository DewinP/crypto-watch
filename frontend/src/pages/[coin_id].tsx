import {
  Flex,
  Heading,
  Stack,
  Icon,
  Text,
  Tag,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetSingleCoinInfoQuery } from "../app/services/cryptoApi";
import CoinHeader from "../components/CoinHeader";
import Layout from "../components/Layout";
import PriceChart from "../components/PriceChart";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/services/auth.slice";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} from "../app/services/api";
import { useState } from "react";

const CoinPage: NextPage = () => {
  let { isLoggedIn, likeCoins } = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const coin_id = router.query.coin_id as string;
  const { data } = useGetSingleCoinInfoQuery({ coin_id }, { skip: !coin_id });
  const [addToFavorite] = useCreateFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [isFavorite, setIsFavorite] = useState<boolean>(likeCoins[coin_id]);
  return (
    <Layout>
      <Stack>
        <Flex justifyContent="space-between">
          <CoinHeader coin={data} />
          <Flex align="center">
            {isLoggedIn && likeCoins[coin_id] && (
              <Tag
                backgroundColor={isFavorite ? "red.400" : "gray.400"}
                color="white"
                mr={1}
              >
                <Icon as={MdFavorite} />
                <Text display={{ base: "none", md: "flex" }}>Liked</Text>
              </Tag>
            )}
            <Tag
              backgroundColor={
                data?.market_data.price_change_24h < 0 ? "red.400" : "green.400"
              }
              color="white"
            >
              <Icon
                as={
                  data?.market_data.price_change_24h < 0
                    ? AiFillCaretDown
                    : AiFillCaretUp
                }
              />
              ${data?.market_data.price_change_24h.toLocaleString("en-US")}
            </Tag>
          </Flex>
        </Flex>
        <Heading size="md" color="blackAlpha.700">
          {data?.name} to USD price history
        </Heading>
        <PriceChart coinId={coin_id} />
        {data?.description.en && (
          <>
            <Heading size="md" color="blackAlpha.700">
              What is {data?.name}
            </Heading>
            <Text
              whiteSpace="pre-wrap"
              dangerouslySetInnerHTML={{
                __html: data?.description.en,
              }}
            />
          </>
        )}
      </Stack>
    </Layout>
  );
};

export default CoinPage;
