import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  Image,
  Flex,
  Box,
  Text,
  Button,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useGetAllCoinPricesQuery } from "../app/services/cryptoApi";
import Layout from "../components/Layout";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const Index = () => {
  const { data, isLoading } = useGetAllCoinPricesQuery();
  return (
    <Layout>
      <Table size="md" border="1px solid">
        <Thead>
          <Tr>
            <Th>Asset</Th>
            <Th>Price 24h</Th>
            <Th>Market Cap</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((coin) => {
            console.log(coin.price_change_percentage_24h < 0);
            return (
              <Tr key={coin.id}>
                <Td>
                  <Flex>
                    <Image boxSize="30px" mr={10} src={coin.image} />
                    <Box>
                      <Heading size="sm" fontWeight={400}>
                        {coin.id[0].toUpperCase() + coin.id.slice(1)}
                      </Heading>
                      <Text color="blackAlpha.500" fontSize="13px">
                        {coin.symbol.toUpperCase()}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Box>
                    <Heading size="sm" fontWeight={400}>
                      {coin.current_price.toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Heading>
                    <Text
                      color={
                        coin.price_change_percentage_24h < 0
                          ? "red.400"
                          : "green.400"
                      }
                      fontSize="13px"
                    >
                      {coin.price_change_percentage_24h > 0 && "+"}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </Text>
                  </Box>
                </Td>
                <Td>
                  {coin.market_cap.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </Td>
                <Td isNumeric>
                  <Tooltip label="Add to favorites" hasArrow>
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      aria-label="Search database"
                      icon={<MdFavoriteBorder />}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Layout>
  );
};

export default Index;
