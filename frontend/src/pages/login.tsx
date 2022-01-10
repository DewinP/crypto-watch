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
import { useLoginUserMutation } from "../app/services/api";
import InputField from "../components/InputField";
import Layout from "../components/Layout";

const Login: React.FC = () => {
  const router = useRouter();
  const [login] = useLoginUserMutation();
  const initialValues = {
    username: "",
    password: "",
  };
  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { accessToken, refreshToken } = await login(values).unwrap();
            console.log(accessToken, refreshToken);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            window.location.href = "/";
          } catch (error) {
            if (error.status === 400) {
              setErrors(toErrorMap(error.data));
            }
            if (error.status === 401) {
              setErrors({
                username: "Invalid username or password",
                password: "Invalid username or password",
              });
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to track all your coins!
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
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <Stack>
                    <Link href={"/signup"}>
                      <ChakraLink align={"end"} color={"blue.500"}>
                        Sign up for an account instead?
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

export default Login;
