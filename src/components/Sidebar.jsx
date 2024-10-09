import React, { useState } from 'react';
import { Box, Text, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const handleMouseEnter = (componentName) => {
    setHoveredComponent(componentName);
  };

  const handleMouseLeave = () => {
    setHoveredComponent(null);
  };

  const links = [
    { name: 'Intensity', path: '/' },
    { name: 'Region', path: '/region' },
    { name: 'Relevance', path: '/relevance' },
    { name: 'Sector', path: '/sector' },
    { name: 'Likelihood', path: '/likelihood' },
    { name: 'Country', path: '/country' },
  ];

  return (
    <Box
      h="full"
      w="220px" 
      position="fixed"
      bg="teal.600"
      color="white"
      p={5}
      top="4rem"
      zIndex={1}
    >
      <Text fontSize="2xl" m={5} fontWeight="bold" textAlign="center">
        Dashboard
      </Text>
      
      <VStack spacing={3} align="stretch">
        {links.map((link) => (
          <Link
            key={link.name}
            as={RouterLink}
            to={link.path}
            p={4}
            borderRadius="md"
            textAlign="center"
            bg={hoveredComponent === link.name ? 'teal.500' : 'transparent'}
            _hover={{ bg: 'teal.500' }}
            onMouseEnter={() => handleMouseEnter(link.name)}
            onMouseLeave={handleMouseLeave}
          >
            {link.name}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
