const Sequelize = require("sequelize");
// va ausar sequelize
// va a usar el modelo de tabla Message y modelo de tabla User
const PrecioModel = require("./models/precio");
const UserModel = require("./models/user");

const sql = new Sequelize("subasta", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

const Precio = PrecioModel(sql, Sequelize);
const User = UserModel(sql, Sequelize);

User.hasMany(Precio);
Precio.belongsTo(User);

sql.sync().then(() => {
  console.log("Tablas creada. Base de datos en uso");
});

module.exports = {
  User,
  Precio,
};
