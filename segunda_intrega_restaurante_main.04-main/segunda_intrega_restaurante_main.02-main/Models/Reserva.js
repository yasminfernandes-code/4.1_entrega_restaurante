import { DataTypes } from "sequelize";
import db from "../Config/databas.js";

const Reserva = db.define("Reserva", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  horario: { // Novo campo
    type: DataTypes.TIME,
    allowNull: false,
  },
  pessoas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Reserva;
