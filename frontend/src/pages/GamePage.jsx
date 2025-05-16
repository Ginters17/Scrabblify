import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Spinner,
  Table,
  Container,
  Heading,
  Button,
  Group,
  Input
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState("");
  const [points, setPoints] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/games/${id}`);
        const data = await res.json();
        if (data.success) {
          setGame(data.data);
        } else {
          alert("Failed to load game");
        }
      } catch (err) {
        alert("Error fetching game");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <Spinner size="xl" />;

  if (!game) return <Text>Game not found.</Text>;

  const turnsByPlayer = {};
  game.players.forEach((p) => {
    turnsByPlayer[p.playerId] = [];
  });
  game.turns.forEach((turn) => {
    if (turnsByPlayer[turn.playerId]) {
      turnsByPlayer[turn.playerId].push(turn);
    }
  });

  const totalPoints = {};
  game.players.forEach((p) => {
    totalPoints[p.playerId] = turnsByPlayer[p.playerId].reduce(
      (sum, turn) => sum + turn.points,
      0
    );
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6} textAlign="center">
        {game.name || "Untitled Game"}
      </Heading>

      <HStack align="start" spacing={8} overflowX="auto">
        {game.players.map((player) => (
          <Box
            key={player.playerId}
            minW="200px"
            borderWidth="1px"
            borderRadius="md"
            p={4}
            bg="white"
            shadow="md"
          >
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              {player.name}
            </Text>

            <Table.Root size="sm" variant="simple">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Word</Table.ColumnHeader>
                <Table.ColumnHeader isNumeric>Points</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {turnsByPlayer[player.playerId].map((turn, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>{turn.playedWord || "-"}</Table.Cell>
                  <Table.Cell isNumeric>{turn.points}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

            <Text mt={4} fontWeight="bold" fontSize="md" textAlign="right">
              Total: {totalPoints[player.playerId]}
            </Text>
          </Box>
        ))}
      </HStack>
      <Input
        placeholder="Word played"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Points"
        type="number"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        mb={2}
      />
      <Button onClick={() => handleSubmitTurn(player.playerId)}>
        Submit Turn
      </Button>
    </Container>
  );
};

export default GamePage;
