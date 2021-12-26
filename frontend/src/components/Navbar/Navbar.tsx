import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  Collapse,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiPower } from "react-icons/fi";
import Link from "next/link";
import { useLogoutMutation, useMeQuery } from "../../app/services/api";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../app/services/auth.slice";
import { IUser } from "../../interfaces";
import router from "next/router";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Navbar: React.FC<{}> = ({}) => {
  let { user, isLoggedIn } = useAppSelector(selectCurrentUser);
  const { isOpen, onToggle } = useDisclosure();
  useMeQuery();
  return (
    <Box>
      <Flex minH="60px" align="center" justifyContent="space-between">
        <Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex alignItems="center" justify={{ base: "center", md: "start" }}>
          <Link href="/">
            <Text
              _hover={{
                cursor: "pointer",
              }}
              fontWeight="bold"
              fontSize={{ base: "md", md: "lg" }}
              textAlign={{ base: "center", md: "left" }}
              color="white"
            >
              Crypto Watch
            </Text>
          </Link>

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
          {isLoggedIn ? <AuthNavbar user={user} /> : <GuestNavbar />}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack display={{ md: "none" }}>{/* <LeftNav isMobile /> */}</Stack>
      </Collapse>
    </Box>
  );
};

export default Navbar;

const AuthNavbar: React.FC<{ user: IUser }> = ({ user }) => {
  const [logout] = useLogoutMutation();

  return (
    <Menu closeOnBlur>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            colorScheme="telegram"
            rightIcon={!isOpen ? <FaChevronDown /> : <FaChevronUp />}
            isActive={isOpen}
          >
            {user.username}
          </MenuButton>
          <MenuList m={0} p={0}>
            <MenuItem
              onClick={async () => {
                await logout();
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                router.push("/");
              }}
            >
              <Icon as={FiPower} mr={2} />
              Logout
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

const GuestNavbar: React.FC<{}> = () => {
  return (
    <>
      <Link href="/login" passHref>
        <Button size="sm" fontSize="sm" colorScheme="telegram">
          Login
        </Button>
      </Link>
      <Link href="/signup" passHref>
        <Button size="sm" colorScheme="telegram">
          Sign Up
        </Button>
      </Link>
    </>
  );
};
