import {
  Table,
  Tbody,
  Select,
  Flex,
  Input,
  Text,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  TableCaption,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useGetAllCoinPricesQuery } from "../app/services/cryptoApi";
import Layout from "../components/Layout";
import CoinListItem from "../components/CoinListItem";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ICoin, SortCoinType } from "../interfaces";
import { FaSearchDollar } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/services/auth.slice";
import { useGetAllFavoriteCoinsQuery } from "../app/services/api";
import TableHeader from "../components/TableHeader";

const MemoCoinListItem = React.memo(CoinListItem);

const Index = () => {
  const { data, isLoading } = useGetAllCoinPricesQuery();
  const { data: allFavoriteCoins } = useGetAllFavoriteCoinsQuery();
  let { isLoggedIn, likeCoins } = useAppSelector(selectCurrentUser);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [likeCoinsList, setFavoriteCoinsList] = useState<ICoin[]>([]);

  useEffect(() => {
    if (data) {
      setCoins(data);
    }
    if (data && likeCoins) {
      let likeCoinsFormatted = data.filter((coin) => likeCoins[coin.id]);
      setFavoriteCoinsList(likeCoinsFormatted);
    }
  }, [data, likeCoins]);
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [sortBy, setSortBy] = useState<SortCoinType>("market_cap_desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchCoin = (searchTerm: string) => {
    let sortedCoins = sortCoins(
      showFavoritesOnly ? likeCoinsList : data,
      sortBy
    );

    let filteredCoins = sortedCoins.filter((coin) => {
      return (
        coin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setCoins(filteredCoins);
  };

  const sortCoins = (coins: ICoin[], sortBy: SortCoinType) => {
    let coinsCopy = [...coins];
    if (sortBy === "market_cap_desc") {
      return coinsCopy?.sort((a, b) => b.market_cap - a.market_cap);
    } else if (sortBy === "market_cap_asc") {
      return coinsCopy?.sort((a, b) => a.market_cap - b.market_cap);
    } else if (sortBy === "price_desc") {
      return coinsCopy?.sort((a, b) => b.current_price - a.current_price);
    } else {
      return coinsCopy?.sort((a, b) => a.current_price - b.current_price);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortCoinType);
    setCoins(sortCoins(coins, e.target.value as SortCoinType));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchCoin(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <Layout>
      <AnimatePresence>
        <Stack>
          <HStack
            textAlign="center"
            align="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            <InputGroup size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearchDollar opacity={0.3} />}
              />
              <Input
                maxW="500px"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a coin"
              />
            </InputGroup>
            {isLoggedIn && (
              <Flex w="100%">
                <Button
                  isFullWidth
                  my={{ base: 2, md: 0 }}
                  size="sm"
                  mr={2}
                  colorScheme="green"
                  onClick={() => {
                    setShowFavoritesOnly(true);
                    setCoins(likeCoinsList);
                    setSearchTerm("");
                  }}
                  leftIcon={<MdFavorite />}
                  variant={showFavoritesOnly ? "solid" : "outline"}
                >
                  Liked Coins
                </Button>

                <Button
                  isFullWidth
                  my={{ base: 2, md: 0 }}
                  size="sm"
                  colorScheme="green"
                  leftIcon={<RiCheckboxMultipleBlankFill />}
                  onClick={() => {
                    setShowFavoritesOnly(false);
                    setCoins(data);
                    setSearchTerm("");
                  }}
                  variant={!showFavoritesOnly ? "solid" : "outline"}
                >
                  Show All
                </Button>
              </Flex>
            )}

            <Flex
              alignSelf={{ base: "center", md: "end" }}
              minW="fit-content"
              alignItems="center"
              width={{ base: "100%", md: "auto" }}
            >
              <Text fontWeight="bold">Sort By:</Text>
              <Select
                bg="#3182CE"
                borderColor="#3182CE"
                color="white"
                onChange={handleSelectChange}
                size="sm"
                w="150px"
                ml={1}
                defaultValue={sortBy}
              >
                <option
                  style={{
                    color: "black",
                  }}
                  value="market_cap_desc"
                >
                  Market Cap Desc
                </option>
                <option
                  style={{
                    color: "black",
                  }}
                  value="market_cap_asc"
                >
                  Market Cap Asc
                </option>
                <option
                  style={{
                    color: "black",
                  }}
                  value="price_desc"
                >
                  Price Desc
                </option>
                <option
                  style={{
                    color: "black",
                  }}
                  value="price_asc"
                >
                  Price Asc
                </option>
              </Select>
            </Flex>
          </HStack>
          <Flex
            border="1px solid"
            borderColor="blackAlpha.200"
            borderRadius={5}
          >
            <Table>
              {coins.length === 0 && !isLoading && searchTerm !== "" && (
                <TableCaption>No coins found for: {searchTerm}</TableCaption>
              )}
              {isLoading && <TableCaption>Loading coins...</TableCaption>}
              {likeCoinsList.length === 0 && isLoggedIn && (
                <TableCaption>
                  You don't have any like coins yet, go ahead and add some!
                </TableCaption>
              )}
              <TableHeader
                tableHeaders={[
                  "Rank",
                  "Coin",
                  "Price 24h",
                  "Market Cap",
                  "24-hr high",
                  "24-hr low",
                  "likes",
                ]}
              />

              <Tbody>
                {sortCoins(coins, sortBy).map((coin) => {
                  if (showFavoritesOnly && !likeCoins[coin.id]) return null;

                  let likeCount = allFavoriteCoins?.filter((likeCoin) => {
                    return likeCoin.coin_id === coin.id;
                  })?.length;
                  return (
                    <MemoCoinListItem
                      likeCount={likeCount}
                      isLoggedIn={isLoggedIn}
                      isFavoriteByUser={likeCoins[coin.id]}
                      key={coin.id}
                      coin={coin}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
        </Stack>
      </AnimatePresence>
    </Layout>
  );
};

export default Index;
