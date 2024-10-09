import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Flex, Heading, Select } from "@chakra-ui/react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Region = () => {
  const [data, setData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://data-visualization-backend-pgiz.onrender.com/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filtered = data.filter((item) => item.region === selectedRegion);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedRegion, data]);

  const regionCounts = {};
  (filteredData || []).forEach((item) => {
    if (item.region) {
      regionCounts[item.region] = (regionCounts[item.region] || 0) + 1;
    }
  });

  const allRegions = [
    ...new Set(data.map((item) => item.region).filter(Boolean)),
  ];

  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        data: Object.values(regionCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
          "#3F51B5",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
          "#3F51B5",
        ],
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce(
            (prev, current) => prev + current,
            0
          );
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = Math.floor((currentValue / total) * 100 + 0.5);
          return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage}%)`;
        },
      },
    },
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={4}>
        <Heading as="h4" mb={0} color="black">
          Regions
        </Heading>
        <Select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          w="200px"
          placeholder="Select a region"
          height="40px"
          borderRadius="md"
          borderColor="gray.300"
          bg="white"
          boxShadow="sm"
        >
          <option value="">All Regions</option>
          {allRegions.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex justify="center" align="center">
        <Doughnut data={chartData} options={options}/>
      </Flex>
    </Box>
  );
};

export default Region;
