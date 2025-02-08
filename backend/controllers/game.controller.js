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
    const game = req.body;

    const newGame = new Game(game);

    try {
        await newGame.save();
        res.status(201).json({ success: true, data: newGame});
    }
    catch (error){
        console.log("Error in create game: ", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}
