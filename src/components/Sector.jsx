import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Box, Heading, useColorModeValue, Flex, Select } from "@chakra-ui/react";
import axios from "axios";

const Sector = () => {
  const [data, setData] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");

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

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  
  const filteredData =
    selectedSector === ""
      ? data
      : data.filter((entry) => entry.sector === selectedSector);

  const sectors = {};

  
  filteredData.forEach((entry) => {
    const sector = entry.sector; 
    const intensity = entry.intensity;

    if (sector && intensity !== undefined) {
      if (!sectors[sector]) {
        sectors[sector] = 0;
      }
      sectors[sector] += intensity;
    }
  });

  const getRandomColor = (index) => {
    const colors = [
      "#FF0080",
      "#00BFFF",
      "#FFD700",
      "#32CD32",
      "#FF4500",
      "#9400D3",
    ];
    return colors[index % colors.length];
  };

  const chartData = {
    labels: Object.keys(sectors),
    datasets: [
      {
        data: Object.values(sectors),
        backgroundColor: Object.keys(sectors).map((_, index) =>
          getRandomColor(index)
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        position: "average",
      },
    },
  };

  return (
    <Box
      p={8}
      borderRadius={20}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      ml={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={700}
      overflow="hidden"
    >
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Heading as="h4" mb={0}>
          Sector
        </Heading>
        <Select
          value={selectedSector}
          onChange={handleSectorChange}
          w="200px"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          focusBorderColor="purple.500"
          fontSize="md"
        >
          <option value="">All Sectors</option>
          {Object.keys(sectors).map((sector, index) => (
            <option key={index} value={sector}>
              {sector}
            </option>
          ))}
        </Select>
      </Flex>

      <Pie data={chartData} options={chartOptions} />
    </Box>
  );
};

export default Sector;
