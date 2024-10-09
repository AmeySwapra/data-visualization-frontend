import React from "react";
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

const Navbar = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      as="nav"
      bg={bg}
      color="black"
      position="fixed"
      w="full"
      zIndex="20"
      top="0"
      borderBottomWidth="1px"
      borderColor={borderColor}
      boxShadow="md"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        py={3}
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" size="lg" textAlign="center" color="blue.700">
          DATA VISUALIZATION DASHBOARD
        </Heading>
      </Flex>
    </Box>
  );
};

export default Navbar;
