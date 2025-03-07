import express from "express";

import { createGame, getGame, updateGame } from "../controllers/game.controller.js";

const router = express.Router();

router.post("/create", createGame);
router.get("/:id", getGame);
router.put("/:id", updateGame);

export default router;