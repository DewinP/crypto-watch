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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdFavoriteBorder } from "react-icons/md";
import { ICoin } from "../interfaces";

const MotionTr = motion<TableRowProps>(Tr);

const CoinListItem: React.FC<{ coin: ICoin }> = ({ coin }) => {
  return (
    <MotionTr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      key={coin?.id}
    >
      <Td>{coin?.market_cap_rank}</Td>
      <Td>
        <Flex>
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
      </Td>
      <Td>
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
      <Td>
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
      <Td>
        <Text color="green.400">
          {coin?.high_24h?.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </Td>
      <Td>
        <Text color="red.400" as="span">
          {coin?.low_24h?.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </Td>
      <Td isNumeric>
        <Tooltip label="Add to favorites" hasArrow>
          <IconButton
            size="sm"
            aria-label="Favorite"
            icon={<MdFavoriteBorder />}
          />
        </Tooltip>
      </Td>
    </MotionTr>
  );
};

export default CoinListItem;
