import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Select,
  Flex,
  Input,
  Text,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useGetAllCoinPricesQuery } from "../app/services/cryptoApi";
import Layout from "../components/Layout";
import CoinListItem from "../components/CoinListItem";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ICoin, SortCoinType } from "../interfaces";
import { FaSearchDollar } from "react-icons/fa";

const Index = () => {
  const { data, isLoading } = useGetAllCoinPricesQuery();
  useEffect(() => {
    if (data) {
      setCoins(data);
    }
  }, [data]);
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [sortBy, setSortBy] = useState<SortCoinType>("market_cap_desc");
  const searchCoin = (searchTerm: string) => {
    let sortedCoins = sortCoins(data, sortBy);
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
  };

  return (
    <Layout>
      <Stack>
        <Flex
          textAlign="center"
          align="center"
          w="100%"
          justifyContent="space-between"
        >
          <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearchDollar opacity={0.3} />}
            />
            <Input
              maxW="500px"
              onChange={handleSearchChange}
              placeholder="Search for a coin"
            />
          </InputGroup>

          <Flex alignSelf="end" minW="fit-content" alignItems="center">
            <Text fontWeight="bold">Sort By:</Text>
            <Select
              onChange={handleSelectChange}
              size="sm"
              w="150px"
              ml={1}
              defaultValue={sortBy}
            >
              <option value="market_cap_desc">Market Cap Desc</option>
              <option value="market_cap_asc">Market Cap Asc</option>
              <option value="price_desc">Price Desc</option>
              <option value="price_asc">Price Asc</option>
            </Select>
          </Flex>
        </Flex>
        <Flex border="1px solid" borderColor="blackAlpha.200" borderRadius={5}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Coin</Th>
                <Th>Price 24h</Th>
                <Th>Market Cap</Th>
                <Th>24-hr high</Th>
                <Th>24-hr low</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <AnimatePresence>
                {coins?.map((coin) => {
                  return <CoinListItem key={coin.id} coin={coin} />;
                })}
              </AnimatePresence>
            </Tbody>
          </Table>
        </Flex>
      </Stack>
    </Layout>
  );
};

export default Index;
