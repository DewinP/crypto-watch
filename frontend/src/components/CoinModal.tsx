import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ICoin } from "../interfaces";

interface CoinModalProps {
  coin: ICoin;
  isOpen: boolean;
  onClose: () => void;
}

const CoinModal: React.FC<CoinModalProps> = ({ coin, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex>
            <Image boxSize="30px" mr={2} src={coin.image} />
            {coin?.id[0].toUpperCase() + coin.id.slice(1)}
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>hello</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CoinModal;
