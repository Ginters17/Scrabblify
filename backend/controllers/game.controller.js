import Game from "../models/game.model.js";

export const getGame = async (req, res) => {
    const { id } = req.params;

    try {
        const game = await Game.findById(id);

        if (!game) {
            return res.status(404).json({ success: false, message: "Game not found" });
        }

        res.status(200).json({ success: true, data: game});
    }
    catch (error){
        console.log("Error in finding game: ", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const updateGame = async (req, res) => {
    const { id } = req.params;

    const game = req.body;

    try {
        const updatedGame = await Game.findByIdAndUpdate(id, game, {new:true});
        res.status(200).json({ success: true, data: updatedGame});
    }
    catch (error){
        console.log("Error in updating game: ", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const createGame = async (req, res) => {
    try {
        const { name, players } = req.body;

        if (!players || players.length < 2 || players.some(p => p.trim() === "")) {
            return res.status(400).json({ success: false, message: "At least two valid players are required." });
        }

        // Assign playerId starting from 1
        const mappedPlayers = players.map((player, index) => ({
            userId: index + 1,
            name: player.trim()
        }));

        const newGame = new Game({
            name: name || "Untitled Game",
            players: mappedPlayers,
            createdAt: new Date()
        });

        await newGame.save();

        res.status(201).json({ success: true, data: newGame });
    } catch (error) {
        console.error("Error in create game:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

