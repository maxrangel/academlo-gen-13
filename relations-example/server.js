const { app } = require('./app');

// Models
const { Actor } = require('./models/actor.model');
const { Movie } = require('./models/movie.model');

// Utils
const { sequelize } = require('./util/database');

// Database authenticated
sequelize
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

// Init models relations
Actor.belongsToMany(Movie, { foreignKey: 'movieId', through: 'actorInMovie' });
Movie.belongsToMany(Actor, { foreignKey: 'actorId', through: 'actorInMovie' });

// Database synced with models' relations
sequelize
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});
