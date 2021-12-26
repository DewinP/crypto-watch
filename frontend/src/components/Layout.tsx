import { Box, Center } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Center backgroundColor="blue.500">
        <Box px={8} maxW="80em" w="100%">
          <Navbar />
        </Box>
      </Center>
      <Box px={8} mb={5}>
        <Center>
          <Box
            marginTop={8}
            maxWidth="70em"
            minW={{
              base: "100%",
              sm: "40em",
              md: "52em",
              lg: "64em",
              xl: "70em",
            }}
          >
            {children}
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Layout;
