import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();

  const apiUrl = "https://backengine-wozt.fly.dev";

  const handleAuth = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/login" : "/signup";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch(apiUrl + endpoint, options);
      const data = await response.json();

      if (response.ok) {
        const accessToken = data.accessToken || "signed-up";
        toast({
          title: `Successfully ${isLogin ? "logged in" : "signed up"}.`,
          description: `Your access token is: ${accessToken}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="lg" py={12}>
      <VStack spacing={8} w="full">
        <Heading>Video Genie</Heading>
        <Text>{isLogin ? "Login to continue to Video Genie." : "Sign up to start using Video Genie."}</Text>
        <Box w="full" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleAuth}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={isLogin ? <FaSignInAlt /> : <FaUserPlus />} colorScheme="blue" w="full" type="submit">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </Stack>
          </form>
          <Flex align="center" justify="center" mt={4}>
            <Text fontSize="sm">{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
            <Button variant="link" colorScheme="blue" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          </Flex>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
