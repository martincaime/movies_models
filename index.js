const { conn } = require("./src/db.js");
const server = require("./src/app.js");
const dummyData = require("./src/dummyData")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    server.listen(process.env.PORT || 3001, () => {
        dummyData();
        console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  }).catch((e) => ((console.log('error en el archivo index.js pricipal', e))));// eslint-disable-line no-console
