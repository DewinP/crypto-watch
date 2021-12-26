import {
  Tr,
  Td,
  Flex,
  Box,
  Heading,
  Tooltip,
  IconButton,
  Text,
  Image,
  TableRowProps,
  Tag,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} from "../app/services/api";
import { ICoin } from "../interfaces";

const MotionTr = motion<TableRowProps>(Tr);

const CoinListItem: React.FC<{
  likeCount: number;
  coin: ICoin;
  isFavoriteByUser: boolean;
  isLoggedIn: boolean;
}> = ({ coin, isLoggedIn, isFavoriteByUser, likeCount }) => {
  const [addToFavorite] = useCreateFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  return (
    <MotionTr
      _hover={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      key={coin?.id}
    >
      <Td display={{ base: "none", md: "table-cell" }}>
        {coin?.market_cap_rank}
      </Td>
      <Td>
        <Link href={`/${coin.id}`}>
          <Flex _hover={{ cursor: "pointer" }}>
            <Image boxSize="30px" mr={10} src={coin.image} />
            <Box color="back">
              <Heading size="sm" fontWeight={400}>
                {coin?.id[0].toUpperCase() + coin.id.slice(1)}
              </Heading>
              <Text color="blackAlpha.500" fontSize="13px">
                {coin?.symbol.toUpperCase()}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Td>
      <Td display={{ base: "none", md: "table-cell" }}>
        <Box>
          <Heading size="sm" fontWeight={400}>
            {coin?.current_price.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </Heading>
          <Text
            color={
              coin?.price_change_percentage_24h < 0 ? "red.400" : "green.400"
            }
            fontSize="13px"
          >
            {coin?.price_change_percentage_24h > 0 && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </Box>
      </Td>
      <Td display={{ base: "none", md: "table-cell" }}>
        <Box>
          <Heading size="sm" fontWeight={400}>
            {coin?.market_cap?.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </Heading>
          <Text
            color={
              coin?.market_cap_change_percentage_24h < 0
                ? "red.400"
                : "green.400"
            }
            fontSize="13px"
          >
            {coin?.market_cap_change_percentage_24h > 0 && "+"}
            {coin?.market_cap_change_percentage_24h?.toFixed(2)}%
          </Text>
        </Box>
      </Td>
      <Td display={{ base: "none", md: "table-cell" }}>
        <Text color="green.400">
          {coin?.high_24h?.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </Td>
      <Td display={{ base: "none", md: "table-cell" }}>
        <Text color="red.400" as="span">
          {coin?.low_24h?.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </Td>
      <Td isNumeric>
        <Flex align="center" justifyContent="center">
          <Text>{likeCount > 0 && likeCount}</Text>
          <Tooltip
            label={
              isFavoriteByUser
                ? "Remove from liked coins"
                : "Add to liked coins"
            }
            hasArrow
          >
            <IconButton
              size="sm"
              variant="ghost"
              colorScheme="green"
              aria-label="Favorite"
              icon={isFavoriteByUser ? <MdFavorite /> : <MdFavoriteBorder />}
              onClick={async () => {
                if (!isFavoriteByUser) {
                  await addToFavorite({ coin_id: coin.id }).unwrap();
                } else {
                  await deleteFavorite({ coin_id: coin.id }).unwrap();
                }
              }}
            />
          </Tooltip>
        </Flex>
      </Td>
    </MotionTr>
  );
};

export default CoinListItem;
