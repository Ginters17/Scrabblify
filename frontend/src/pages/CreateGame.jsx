import { Box, Button, VStack, Text, Input, Container, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const CreateGame = () => {
  const [gameName, setGameName] = useState(""); // Optional game name
  const [players, setPlayers] = useState(["", ""]); // Start with 2 players
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);

    // Add a new player input only when the last available input is filled
    if (players.length < 4 && index === players.length - 1 && value.trim() !== "") {
      setPlayers([...updatedPlayers, ""]);
    }
  };

  const handleSubmit = async () => {
    // Remove empty players
    const validPlayers = players.filter(name => name.trim() !== "");
    if (validPlayers.length < 2) {
      alert("At least two players are required.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/games/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: gameName.trim() || "Untitled Game", players: validPlayers }),
    });

    const data = await response.json();
    if (data.success) {
      navigate(`/game/${data.data._id}`); // Redirect to game page
    } else {
      alert("Error creating game.");
    }
  };

  return (
    <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" minH="100vh" bg="gray.100">
      <VStack spacing={6} w="full" maxW="300px">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
          mb="4"
        >
          CREATE GAME
        </Text>

        {/* Game Name Input (Optional) */}
        <Input
          placeholder="Game Name (Optional)"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          bg="white"
          borderRadius="md"
          shadow="sm"
        />

        {/* Player Name Inputs */}
        {players.map((player, index) => (
          <Input
            key={index}
            placeholder={`Player ${index + 1}`}
            value={player}
            onChange={(e) => handleChange(index, e.target.value)}
            bg="white"
            borderRadius="md"
            shadow="sm"
          />
        ))}

        <Button colorScheme="pink" size="lg" w="full" onClick={handleSubmit}>
          Start Game
        </Button>
        <Button
          as={RouterLink}
          to="/"
          colorScheme="purple"
          size="lg"
          width="full"
        >
          Back
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateGame;
