import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Country from "../components/Country";

function CountryPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box  ml='200px'  bg='gray.100' p={4}  minHeight="50vh">
        <Country />
      </Box>
    </>
  );
}

export default CountryPage;
