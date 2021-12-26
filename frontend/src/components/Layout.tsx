import { Box, Divider, Center } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <Box px={{ base: 4, md: 8 }} mb={5}>
      <Navbar />
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
  );
};

export default Layout;
