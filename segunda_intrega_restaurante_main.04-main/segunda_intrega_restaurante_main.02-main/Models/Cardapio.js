// Models/Cardapio.js
import { DataTypes } from "sequelize";
import db from "../Config/databas.js";

const Cardapio = db.define("Cardapio", {
  nome: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descricao: { 
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
});

export default Cardapio;