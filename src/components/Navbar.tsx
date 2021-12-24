import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Button, Collapse, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

const Navbar: React.FC<{}> = ({}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex minH="60px" align="center">
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          alignItems="center"
          justify={{ base: "center", md: "start" }}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            textAlign={{ base: "center", md: "left" }}
          >
            Crypto Tracker
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            {/* <LeftNav /> */}
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Link href="/login" passHref>
            <Button as={"a"} fontSize="sm" fontWeight={400} colorScheme="teal">
              Login
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack display={{ md: "none" }}>{/* <LeftNav isMobile /> */}</Stack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
