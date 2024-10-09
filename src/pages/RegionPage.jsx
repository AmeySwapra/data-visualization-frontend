import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Region from '../components/Region';

function RegionPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box  flex={{ base: "1", md: "0.5" , }}
              maxW="50%"
              maxH="30%"
              p={5}
              marginTop={'100px'}
              marginLeft={'500px'}
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
              borderRadius={20}
              >
        <Region/>
      </Box>
    </>
  );
}

export default RegionPage;