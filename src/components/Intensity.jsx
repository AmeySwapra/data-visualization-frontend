import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
    CategoryScale
} from 'chart.js';
import axios from 'axios';
import { Box, Flex, Heading, Select } from '@chakra-ui/react';

ChartJS.register(LineElement, LinearScale, PointElement, Tooltip, Legend, Filler, CategoryScale);

const IntensityLikelihood = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [chartData, setChartData] = useState({});
    const [dataArray, setDataArray] = useState([]);
    const [years, setYears] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://data-visualization-backend-pgiz.onrender.com/api/data-intensity');
            setDataArray(response.data);
    
            const uniqueYears = [...new Set(response.data.map(data => data.year))];
            setYears(uniqueYears);
            if (uniqueYears.length > 0) {
                setSelectedYear(uniqueYears[0]); 
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const drawChart = (year) => {
        const selectedData = dataArray.find(data => data.year === year);
        if (selectedData) {
            const data = {
                labels: Array.from({ length: selectedData.intensity.length }, (_, i) => `Point ${i + 1}`),
                datasets: [
                    {
                        label: `Intensity for ${year}`,
                        data: selectedData.intensity,
                        borderColor: '#42a5f5',
                        backgroundColor: 'rgba(66, 165, 245, 0.2)',
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: `Likelihood for ${year}`,
                        data: selectedData.likelihood,
                        borderColor: '#ff7043',
                        backgroundColor: 'rgba(255, 112, 67, 0.2)',
                        fill: true,
                        tension: 0.4,
                    },
                ],
            };
            setChartData(data);
        } else {
            console.error('No data found for the selected year:', year);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (dataArray.length > 0 && selectedYear) {
            drawChart(selectedYear);
        }
    }, [selectedYear, dataArray]);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <Box p={4} maxW="1000px" mx="auto" my={10}>
            <Box height="500px" boxShadow="lg" borderRadius="md" overflow="hidden" p={5} bg="white">
                <Flex justify="space-between" align="center" mb={4}>
                    <Heading as="h1" size="lg" color="black">
                        Intensity vs Likelihood
                    </Heading>
                    <Select 
                        value={selectedYear || ''} 
                        onChange={handleYearChange}
                        width="200px" 
                        height="40px"
                        borderRadius="md"
                        borderColor="gray.300"
                        bg="black" 
                        color="white" 
                        boxShadow="sm"
                    >
                        {years.map(year => (
                            <option key={year} value={year} style={{ color: 'black' }}> 
                                {year}
                            </option>
                        ))}
                    </Select>
                </Flex>

                {chartData.datasets && chartData.datasets.length > 0 && (
                    <Box mt={4} height="90%">
                        <Line 
                            data={chartData} 
                            options={{ 
                                responsive: true, 
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        type: 'category',
                                        title: {
                                            display: true,
                                            text: 'Data Points',
                                            font: {
                                                size: 16,
                                                weight: 'bold',
                                            },
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            font: {
                                                size: 16,
                                                weight: 'bold',
                                            },
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        labels: {
                                            font: {
                                                size: 14,
                                            },
                                        },
                                    },
                                },
                            }} 
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default IntensityLikelihood;


