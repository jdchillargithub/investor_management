import Sequelize from "sequelize";

const sequelize = new Sequelize("investor_management", "root", "", {
  dialect: "mysql",
  host: "localhost",
  // host: currentConfig.MYSQL_HOST,
  // port: currentConfig.MYSQL_PORT,
  // username: currentConfig.MYSQL_USER,
  // password: currentConfig.MYSQL_PASSWORD,
  // database: currentConfig.MYSQL_DATABASE,
  logging: false, // Set to true to log SQL queries (optional)
});

// const sequelize = new Sequelize('sample', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });
export default sequelize;
