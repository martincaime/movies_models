require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// DB Config
// Initialize Sequelize depending on the environment
// (development, staging or production)
const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: DB,
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        ssl: true,
      })
    : new Sequelize(
        `${DB}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        { logging: false, native: false }
      );

// Reads all the files in models folder,
// importing them and pushing to the modelDefiners array
// to automate the models connection
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Connect all the models to the DB 
modelDefiners.forEach((model) => model(sequelize));

// Capitalize the names of the models ie: movie => Movie
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// In sequelize.models are all the imported models as properties
// to use destructuring for easy access
const { Movie, Person } = sequelize.models;

// Models relations N:M
// The alias is to know how to call the correct methods
// Sets the junction table to avoid primary key issues
// The foreign key sets the column name to easy querying in the DB
Movie.belongsToMany(Person, {as: "Casting", through: "actors", foreignKey: "MovieId" });
Person.belongsToMany(Movie, {as: "Casting", through: "actors", foreignKey: "ActorId"});
Movie.belongsToMany(Person, {as: "Director", through: "directors", foreignKey: "MovieId"});
Person.belongsToMany(Movie, {as: "Director", through: "directors", foreignKey: "DirectorId"});
Movie.belongsToMany(Person, {as: "Producer", through: "producers", foreignKey: "MovieId"});
Person.belongsToMany(Movie, {as: "Producer", through: "producers", foreignKey: "ProducerId"});

module.exports = {
  ...sequelize.models, // To be able to call the models like this: const { Product, User } = require("./db.js");
  conn: sequelize, // To import the connection as:  { conn } = require("./db.js");
};
