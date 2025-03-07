import { Box, Button, VStack, Text, Container } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";

const HomePage = () => {
  return (
      <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" minH="100vh" bg="gray.100">
        <VStack spacing={6} w="full" maxW="300px">
          <Text
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              bgClip='text'
              fontSize='6xl'
              fontWeight='extrabold'
              mb='4'>
              SCRABBLIFY
          </Text>
          <Link to="/create" style={{ display: "block", width: "100%" }}>
            <Button colorScheme="pink" size="lg" w="full">
              Create Game
            </Button>
          </Link>
          <Link to="/continue" style={{ display: "block", width: "100%" }}>
            <Button colorScheme="purple" size="lg" w="full">
              Continue Game
            </Button>
          </Link>
        </VStack>
      </Box>
  )
}

export default HomePage
