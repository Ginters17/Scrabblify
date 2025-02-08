import { Box, Button, VStack, Text } from '@chakra-ui/react'
import React from 'react'

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
        <Button colorScheme="pink" fontWeight="bold" boxShadow="lg" size="lg" w="full" onClick={() => navigate("/create")}>
          Create Game
        </Button>
        <Button colorScheme="purple" size="lg" w="full" onClick={() => navigate("/continue")}>
          Continue Game
        </Button>
      </VStack>
    </Box>
  )
}

export default HomePage
