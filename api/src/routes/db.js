const { Router } = require("express");

const videogamesCtr = require("../controllers/videogames");
const router = Router();

// GET /
router.get("/myGames", videogamesCtr.getMyGames);
