const { app } = require('./app');

// Models
const { initModels } = require('./models/initModels');

// Utils
const { db } = require('./utils/database.util');

const startServer = async () => {
  try {
    // Authenticate database credentials
    await db.authenticate();

    // Establish models relations
    initModels();

    // Sync sequelize models
    await db.sync();

    // Spin up server
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Express app running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
