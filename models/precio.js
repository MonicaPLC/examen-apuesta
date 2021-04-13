module.exports = (sql, type) => {
  //crear modelo de tabla (estructura)
  return sql.define(
    "precio",
    {
      //id queda fijo

      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      producto: {
        type: type.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Debe ingresar un valor",
          },
        },
      },

      valor: {
        type: type.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Debe ingresar un valor",
          },
        },
      },
    },
    { timestamps: true }
  );
};
