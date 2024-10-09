import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Likelihood from "../components/Likelihood";

function LikelihoodPage
() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box
        flex={{ base: "1", md: "0.5" }}
        maxW="50%"
        maxH="50%"
        p={5}
        marginTop={"50px"}
        marginLeft={"400px"}
      >
        <Likelihood/>
      </Box>
    </>
  );
}

export default LikelihoodPage
;
