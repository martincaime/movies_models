const { Movie, Person } = require("./db.js");
const { v4: uuidv4 } = require("uuid");

async function dummyData() {
    // Create dummy data for people
    const tom_cruise = Person.create({
      id: uuidv4(),
      name: "Tom",
      last_name: "Cruise",
      age: 30,
    });
  
    const jennifer = Person.create({
      id: uuidv4(),
      name: "Jennifer",
      last_name: "Anniston",
      age: 25,
    });
  
    const robin = Person.create({
      id: uuidv4(),
      name: "Robin",
      last_name: "Williams",
      age: 40,
    });
  
    const james = Person.create({
      id: uuidv4(),
      name: "James",
      last_name: "McAvoy",
      age: 35,
    });
  
    const [Tom, Jennifer, Robin, James] = await Promise.all([
      tom_cruise,
      jennifer,
      robin,
      james,
    ]);
  
    // Create dummy data for movies
    const jurassic_park = Movie.create({
      id: uuidv4(),
      title: "Jurassic Park",
      year: 1967,
    });
  
    const mission_impossible = Movie.create({
      id: uuidv4(),
      title: "Mission Impossible",
      year: 2014,
    });
  
    const [JP, MI] = await Promise.all([jurassic_park, mission_impossible]);
  
    // Setting relations
    await JP.addCasting([Robin.dataValues.id, Jennifer.dataValues.id]);
    await JP.addDirector([James.dataValues.id, Robin.dataValues.id]);
    await JP.addProducer(Jennifer.dataValues.id);
    await MI.addCasting([Tom.dataValues.id, Jennifer.dataValues.id]);
    await MI.addDirector(James.dataValues.id);
    await MI.addProducer([
      Tom.dataValues.id,
      Robin.dataValues.id,
      James.dataValues.id,
    ]);
  };

module.exports = dummyData
