import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Select,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios"; 
import { Bar } from "react-chartjs-2"; 

const Country = () => {
  const { colorMode } = useColorMode();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]); 
  const [fullData, setFullData] = useState([]); 

  useEffect(() => {
    fetchCountries(); 
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://data-visualization-backend-pgiz.onrender.com/api/data");
      setFullData(response.data); 
      const countryList = response.data
        .map((entry) => entry.country)
        .filter((country) => country !== undefined); 
      const uniqueCountries = [...new Set(countryList)]; 
      setCountries(uniqueCountries); 
      setSelectedCountry(uniqueCountries[0]); 
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  
  const chartData = () => {
    const countryData = fullData.filter(
      (entry) => entry.country === selectedCountry
    ); 
    const sectors = {};

    countryData.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = [];
      }
      sectors[entry.sector].push(entry.intensity);
    });

    const sectorLabels = Object.keys(sectors);
    const sectorIntensities = sectorLabels.map((sector) =>
      Math.max(...sectors[sector])
    ); 

    return {
      labels: sectorLabels,
      datasets: [
        {
          label: "Intensity",
          data: sectorIntensities,
          backgroundColor:
            colorMode === "light"
              ? "rgba(79, 59, 169, 0.7)"
              : "rgba(144, 104, 190, 0.7)",
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Box
      p={6}
      borderRadius={20}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      ml={50}
      shadow="md"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex justify="space-between" align="center">
        <Heading as="h2" size="lg">
          Select Country
        </Heading>
        <Select
          placeholder="Select country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          w="200px"
          height="40px"
          borderRadius="md"
          borderColor="gray.300"
          bg="white"
          boxShadow="sm"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </Select>
      </Flex>
      <Box mt={5}>
        <Bar
          data={chartData()}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Sector",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Intensity",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Country;
