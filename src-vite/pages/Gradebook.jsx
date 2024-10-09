import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Flex, Heading, Text, VStack, Progress, Tag, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';
import { Settings, User, Book, Clock, BarChart2 } from 'lucide-react';

export default function CleferrInterface() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data from an API when the component mounts
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('/api/assignments'); // Replace with your actual API endpoint
        setAssignments(response.data); // Assuming the API returns an array of assignments
      } catch (err) {
        setError('Failed to fetch assignments');
        setAssignments([]); // Return an empty list if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <Box minH="100vh" bg="blue.50" p={4}>
      <Box maxW="6xl" mx="auto" bg="white" rounded="lg" shadow="lg">
        <Flex>
          {/* Sidebar */}
          <Box w="64" bg="indigo.900" color="white" p={4} roundedLeft="lg">
            <Flex alignItems="center" mb={8}>
              <Box w={8} h={8} mr={2} bg="white" rounded="full" display="flex" justifyContent="center" alignItems="center">
                <Box w={6} h={6} bg="indigo.900" rounded="full" display="flex" justifyContent="center" alignItems="center">
                  <Box w={2} h={2} bg="white" rounded="full" />
                </Box>
              </Box>
              <Heading size="lg">Cleferr™</Heading>
            </Flex>

            <VStack spacing={4} align="stretch">
              <Flex alignItems="center">
                <BarChart2 size={20} />
                <Text ml={2}>Dashboard</Text>
              </Flex>
              <Flex alignItems="center">
                <Book size={20} />
                <Text ml={2}>Assignments</Text>
              </Flex>
              <Flex alignItems="center">
                <User size={20} />
                <Text ml={2}>Roster</Text>
              </Flex>
              <Flex alignItems="center">
                <Clock size={20} />
                <Text ml={2}>Extensions</Text>
              </Flex>
              <Flex alignItems="center">
                <Settings size={20} />
                <Text ml={2}>Course Settings</Text>
              </Flex>
            </VStack>

            <Box mt={8}>
              <Text fontSize="sm" color="blue.300" mb={2}>Instructor</Text>
              <Flex alignItems="center">
                <User size={20} />
                <Text ml={2}>Demo Instructor</Text>
              </Flex>
            </Box>
          </Box>

          {/* Main content */}
          <Box flex="1" p={6}>
            <Flex justify="space-between" alignItems="center" mb={6}>
              <Box>
                <Heading size="xl">Cleferr 101</Heading>
                <Text color="gray.600">Spring 2024</Text>
              </Box>
              <Text color="gray.600">Entry Code: <Text as="span" fontFamily="mono">XYZ789</Text></Text>
            </Flex>

            <Box mb={6}>
              <Heading size="md" mb={2}>Description</Heading>
              <Text color="gray.600">This is a course for demo presentations.</Text>
            </Box>

            {/* Error message */}
            {error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}

            {/* Things To Do */}
            <Box mb={6}>
              <Heading size="md" mb={2}>Things To Do</Heading>
              <Text color="gray.600">Finish grading Demo Midterm Ungraded and respond to 2 regrade requests.</Text>
            </Box>

            {/* Active Assignments */}
            <Box>
              <Flex fontWeight="semibold" fontSize="sm" color="gray.600" mb={2}>
                <Text flex="2">ACTIVE ASSIGNMENTS</Text>
                <Text>RELEASED</Text>
                <Text>DUE (PDT)</Text>
                <Text>SUBMISSIONS</Text>
                <Text>% GRADED</Text>
                <Text>PUBLISHED</Text>
              </Flex>
              {loading ? (
                <Spinner size="xl" />
              ) : assignments.length === 0 ? (
                <Text>No assignments available at the moment.</Text>
              ) : (
                assignments.map((assignment) => (
                  <Flex
                    key={assignment.id}
                    alignItems="center"
                    bg="gray.50"
                    p={4}
                    rounded="lg"
                    mb={2}
                    cursor="move"
                    _hover={{ bg: 'gray.100' }}
                    transition="opacity 0.2s"
                  >
                    <Text flex="2">{assignment.name}</Text>
                    <Text>{assignment.released}</Text>
                    <Text>{assignment.due}</Text>
                    <Text>{assignment.submissions}</Text>
                    <Flex w="100%" alignItems="center">
                      <Progress value={assignment.graded} size="sm" colorScheme="indigo" flex="1" />
                      <Text fontSize="sm" ml={2}>{assignment.graded}%</Text>
                    </Flex>
                    <Text>
                      {assignment.published ? (
                        <Tag colorScheme="green">ON</Tag>
                      ) : (
                        <Tag colorScheme="gray">OFF</Tag>
                      )}
                    </Text>
                  </Flex>
                ))
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
