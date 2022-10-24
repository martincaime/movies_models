const { Movie, Person } = require("../db");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
  let { name, last_name } = req.query;
  let person = await Person.findAll({
    where: name
      ? {
          name: {
            [Op.like]: `%${name}%`,
          },
          last_name: {
            [Op.like]: `%${last_name}%`,
          },
        }
      : null,
    include: [
      {
        model: Movie,
        as: "Casting",
        attributes: ["title"],
      },
      {
        model: Movie,
        as: "Director",
        attributes: ["title"],
      },
      {
        model: Movie,
        as: "Producer",
        attributes: ["title"],
      },
    ],
  });
  res.send(person);
});

router.get("/:personId", async (req, res) => {
  let { personId } = req.params;
  let person = await Person.findByPk(personId, {
    include: [
      {
        model: Movie,
        as: "Casting",
        attributes: ["title"],
      },
      {
        model: Movie,
        as: "Director",
        attributes: ["title"],
      },
      {
        model: Movie,
        as: "Producer",
        attributes: ["title"],
      },
    ],
  });
  res.send(person);
});

router.post("/", async (req, res) => {
  let { name, last_name, age, casting, director, producer } = req.body;
  let id = uuidv4();
  let newPerson = { id, name, last_name, age };
  let person = await Person.create(newPerson);
  casting.forEach(async (element) => {
    let casting = await Movie.findOne({
      where: {
        title: element,
      },
    });
    person.addCasting(casting.dataValues.id);
  });
  director.forEach(async (element) => {
    let director = await Movie.findOne({
      where: {
        title: element,
      },
    });
    person.addDirector(director.dataValues.id);
  });
  producer.forEach(async (element) => {
    let producer = await Movie.findOne({
      where: {
        title: element,
      },
    });
    person.addProducer(producer.dataValues.id);
  });
  res.send(person);
});

router.put("/:personId", async (req, res) => {
  let { personId } = req.params;
  let { name, last_name, age, casting, director, producer } = req.body;
  let newPerson = { name, last_name, age };
  let person = await Person.update(newPerson, { where: { id: personId } });
  person = await Person.findByPk(personId);
  let castingId = [];
  casting.forEach(async (element) => {
    let casting = await Movie.findOne({
      where: {
        title: element,
      },
    });
    castingId.push(casting.dataValues.id);
  });
  person.setCasting(castingId);
  let directorId = [];
  director.forEach(async (element) => {
    let director = await Movie.findOne({
      where: {
        title: element,
      },
    });
    directorId.push(director.dataValues.id);
  });
  person.setDirector(directorId);
  let producerId = [];
  producer.forEach(async (element) => {
    let producer = await Movie.findOne({
      where: {
        title: element,
      },
    });
    producerId.push(producer.dataValues.id);
  });
  person.setProducer(producerId);
  res.send(person);
});

router.delete("/:personId", (req, res) => {
  let { personId } = req.params;
  Person.destroy({ where: { id: personId } })
    .then(() => {
      res.status(200).json({ msg: "Person deleted" });
    })
    .catch(() => res.status(404));
});

module.exports = router;
