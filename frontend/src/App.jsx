import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateGame from "./pages/CreateGame";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/create" element={<CreateGame />}/>
          <Route path="/game/:id" element={<GamePage />}/>
        </Routes>
      </Box>
    </>
  )
}

export default App
