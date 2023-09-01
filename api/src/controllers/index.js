require("dotenv").config();
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { Op } = require("sequelize");
const { VIDEOGAMES_URL, BASE_URL } = require("../constants");
const { Genre, Videogame, Video_Genre } = require("../db.js");

class ModelCrud {
  constructor(model) {
    this.model = model;
  }
  //busca en la API
  getAllVideogames = async (req, res, next) => {
    try {
      const apiGame = await axios.get(`${VIDEOGAMES_URL}&page_size=200`);
      const results = apiGame.data.results;
      // console.log(apiGame);
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getMyGames = async (req, res, next) => {
    try {
      const myGames = await Videogame.findAll({
        include: [
          {
            model: Genre,

            attributes: ["id", "name"],
          },
        ],
      });

      return res.status(200).json(myGames);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getByName = async (req, res, next) => {
    let name = req.query.name;
    name = name.replace(/["']/g, "");

    try {
      const [myGameResults, apiGameResults] = await Promise.all([
        Videogame.findAll({
          include: [
            {
              model: Genre,
              as: "genres",
              attributes: ["id", "name"],
            },
          ],
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        }),
        axios.get(`${VIDEOGAMES_URL}&search=${name}&page_size=100`),
      ]);

      const response = myGameResults.concat(apiGameResults.data.results);
      res.json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id.length > 9) {
      console.log("entre a la BD");
      const game = await this.model.findByPk(id, {
        include: [
          {
            model: Genre,
            as: "genres",
            attributes: ["id", "name"],
          },
        ],
      });
      if (game) return res.send(game);
      return res.send("No se encontro ese videojuego en la BD");
    } else {
      const apiGame = await axios.get(`${BASE_URL}games/${id}?key=${API_KEY}`);
      if (apiGame) {
        return res.send(apiGame.data);
      } else {
        return res.send("No se encontro esa videojuego en la API");
      }
    }
  };

  post = async (req, res, next) => {
    try {
      const { name, description, released, rating, platforms, genre, image } =
        req.body;
      console.log(name, description, released, rating, platforms, genre);
      let game = await this.model.create({
        name,
        description,
        released,
        rating,
        platforms,
        image,
        id: uuidv4(),
      });
      genre.forEach(async (g) => {
        let genero = await Genre.findOne({
          where: {
            name: g,
          },
        });

        game.addGenre(genero);
      });
      return res.send("Videogame Creado!");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getAllGenres = async (req, res, next) => {
    //Incluir videojuegos asociados?
    try {
      const apiGenres = await axios.get(`${BASE_URL}genres?key=${API_KEY}`);
      const api = apiGenres.data.results;
      console.log("API");
      // console.log(api.map(g => {g.name}));
      api.forEach(async (g) => {
        await Genre.findOrCreate({
          where: {
            name: g.name,
          },
        });
      });
      const find = await this.model.findAll();
      // console.log(find.length);
      // if(find.length === 19) return res.send
      res.send(find);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ModelCrud;
