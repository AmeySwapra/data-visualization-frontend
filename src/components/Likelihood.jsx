import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Box, useColorModeValue, Heading, Select, Flex } from "@chakra-ui/react";
import axios from "axios";
import {
    Chart as ChartJS,
    RadialLinearScale,
  } from 'chart.js';
  
  ChartJS.register(RadialLinearScale);

const Likelihood = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://data-visualization-backend-pgiz.onrender.com/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  const countries = ["All", ...new Set(data.map((entry) => entry.country))];

  
  const filteredData =
    selectedCountry === "All"
      ? data
      : data.filter((entry) => entry.country === selectedCountry);

  const chartData = {
    labels: filteredData.map((entry) => entry.country),
    datasets: [
      {
        label: "Likelihood",
        data: filteredData.map((entry) => entry.likelihood),
        backgroundColor: useColorModeValue(
          "rgba(79, 59, 169, 0.7)",
          "rgba(144, 104, 190, 0.7)"
        ),
        borderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
        borderWidth: 2,
        pointBackgroundColor: useColorModeValue("white", "black"),
        pointBorderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5,
        stepSize: 1,
        font: {
          family: "Roboto",
          size: 14,
          weight: "bold",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            family: "Roboto",
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box
      borderRadius={20}
      pt={6}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={700}
      overflow="hidden"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={6}
        py={4}
        borderBottom="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
      >
        <Heading as="h4" mb={0} fontWeight="bold">
          Likelihood
        </Heading>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          mb={0}
          ml={4}
          w="200px"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          focusBorderColor="purple.500"
          fontSize="md"
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </Select>
      </Flex>

      <Radar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default Likelihood;
