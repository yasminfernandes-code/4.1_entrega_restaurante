// Models/Pedido.js
import { DataTypes } from "sequelize";
import db from "../Config/databas.js";

const Pedido = db.define("Pedido", {
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
  nome: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  itens: { 
    type: DataTypes.TEXT,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Em Preparo', 'Pronto', 'Entregue', 'Cancelado'),
    allowNull: false,
    defaultValue: 'Pendente' 
  },
});

export default Pedido;