import { Flex, Heading, Image } from "@chakra-ui/react";
import { ISingleCoin } from "../interfaces";

const CoinHeader: React.FC<{ coin: ISingleCoin }> = ({ coin }) => {
  return (
    <Flex>
      <Image src={coin?.image?.small} mr={2} />
      <Heading>{coin?.name}</Heading>
      <Heading color="blackAlpha.600" as="h2" size="sm">
        ({coin?.symbol})
      </Heading>
    </Flex>
  );
};

export default CoinHeader;
