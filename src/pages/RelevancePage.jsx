import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Relevance from "../components/Relevance";

function RelevancePage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box ml="220px" p={4} bg="gray.100" minHeight="100vh">
        <Relevance />
      </Box>
    </>
  );
}

export default RelevancePage;
