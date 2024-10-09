import React, { useState, useEffect } from "react";
import { Box, Heading, Select, Flex, useColorModeValue } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Relevance = () => {
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

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

  const filteredData =
    selectedFilter === "all"
      ? data
      : data.filter((item) => item.sector === selectedFilter);

  const sectors = Array.from(new Set(data.map((item) => item.sector)));

  const chartData = {
    labels: filteredData
      .map((item) => item.likelihood)
      .filter((label) => label !== ' '), 
    datasets: [
      {
        label: "Relevance",
        data: filteredData
          .map((item) => item.relevance)
          .filter((value) => value !== ' '), 
        backgroundColor: filteredData
          .map((_, index) => `hsl(${(index * 45) % 360}, 70%, 50%)`)
          .filter((_, index) => filteredData[index].relevance !== undefined), 
      },
    ],
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
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Heading as="h2">Relevance</Heading>
        <Select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          w="200px"
        >
          <option value="all">All Sectors</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </Select>
      </Flex>
      <Bar data={chartData} options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Relevance: ${context.raw}`;
              }
            }
          }
        },
        scales: {
          x: { title: { display: true, text: "Likelihood" } },
          y: { title: { display: true, text: "Relevance" } }
        }
      }} />
    </Box>
  );
};

export default Relevance;
