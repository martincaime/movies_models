const { Movie, Person } = require("../db");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
  let { title } = req.query;
  let movie = await Movie.findAll({
    where: title
      ? {
          title: {
            [Op.like]: `%${title}%`,
          },
        }
      : null,
    include: [
      {
        model: Person,
        as: "Casting",
        attributes: ["name", "last_name"],
      },
      {
        model: Person,
        as: "Director",
        attributes: ["name", "last_name"],
      },
      {
        model: Person,
        as: "Producer",
        attributes: ["name", "last_name"],
      },
    ],
  });
  res.send(movie);
});

router.get("/:movieId", async (req, res) => {
  let { movieId } = req.params;
  let movie = await Movie.findByPk(movieId, {
    include: [
      {
        model: Person,
        as: "Casting",
        attributes: ["name", "last_name"],
      },
      {
        model: Person,
        as: "Director",
        attributes: ["name", "last_name"],
      },
      {
        model: Person,
        as: "Producer",
        attributes: ["name", "last_name"],
      },
    ],
  });
  res.send(movie);
});

router.post("/", async (req, res) => {
  let { title, year, casting, director, producer } = req.body;
  let id = uuidv4();
  let newMovie = { id, title, year };
  let movie = await Movie.create(newMovie);
  casting.forEach(async (element) => {
    let actor = await Person.findOne({
      where: {
        name: element.split(" ")[0],
        last_name: element.split(" ")[1],
      },
    });
    movie.addCasting(actor.dataValues.id);
  });
  director.forEach(async (element) => {
    let director = await Person.findOne({
      where: {
        name: element.split(" ")[0],
        last_name: element.split(" ")[1],
      },
    });
    movie.addDirector(director.dataValues.id);
  });
  producer.forEach(async (element) => {
    let producer = await Person.findOne({
      where: {
        name: element.split(" ")[0],
        last_name: element.split(" ")[1],
      },
    });
    movie.addProducer(producer.dataValues.id);
  });
  res.send(movie);
});

router.put("/:movieId", async (req, res) => {
  let { movieId } = req.params;
  let { title, year, casting, director, producer } = req.body;
  let newMovie = { title, year };
  let movie = await Movie.update(newMovie, { where: { id: movieId } });
  movie = await Movie.findByPk(movieId)
  let castingId = [];
  casting.forEach(async (element) => {
    let actor = await Person.findOne({
      where: {
        name: element.split(" ")[0],
        last_name: element.split(" ")[1],
      },
    });
    castingId.push(actor.dataValues.id);
  });
  movie.setCasting(castingId);
  let directorId = [];
  director.forEach(async (element) => {
    let director = await Person.findOne({
      where: {
        name: element.split(" ")[0],
        last_name: element.split(" ")[1],
      },
    });
    directorId.push(director.dataValues.id);
  });
  movie.setDirector(directorId);
  let producerId = [];
  producer.forEach(async (element) => {
    let producer = await Person.findOne({
      where: {
        name: element.split(" ")[0],
        last_name: element.split(" ")[1],
      },
    });
    producerId.push(producer.dataValues.id);
  });
  movie.setProducer(producerId);
  res.send(movie);
});

router.delete("/:movieId", (req, res) => {
  let { movieId } = req.params;
  Movie.destroy({ where: { id: movieId } })
    .then(() => {
      res.status(200).json({ msg: "Movie deleted" });
    })
    .catch(() => res.status(404));
});

module.exports = router;
