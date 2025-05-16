import mongoose from "mongoose";
import { nanoid } from "nanoid";

const TurnSchema = new mongoose.Schema({
    playerId: { type: String, ref: 'User', required: true },
    points: { type: Number, required: true },
    playedWord: { type: String, required: false },
    timestamp: { type: Date, default: Date.now }
  });
  
  const PlayerSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true},
    name: { type: String, required: true },
    totalPoints: { type: Number, default: 0 }
  });

  const GameSchema = new mongoose.Schema({
    _id: { type: String, default: () => nanoid(6) },
    name: { type: String, required: false },
    players: [PlayerSchema],
    turns: [TurnSchema],
    status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
    createdAt: { type: Date, default: Date.now }
  });

  const Game = mongoose.model('Game', GameSchema);
  export default Game;