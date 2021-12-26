import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  Stack,
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../components/InputField";
import Layout from "../components/Layout";

const Signup: React.FC = () => {
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          try {
          } catch (error) {
            if (error.status === 400) {
              setErrors(toErrorMap(error.data));
            }
            if (error.status === 401) {
              setErrors({
                email: "Invalid email or password",
                password: "Invalid email or password",
              });
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign Up</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  and start tracking your coins!
                </Text>
              </Stack>
              <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <InputField
                    name="username"
                    label="Username"
                    placeholder="Username"
                  />
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />

                  <InputField
                    label="Confirm Password"
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Re-enter password"
                  />
                  <Stack>
                    <Link href={"/login"}>
                      <ChakraLink align={"end"} color={"green.500"}>
                        Login instead?
                      </ChakraLink>
                    </Link>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Signup;
