import { DataTypes } from 'sequelize';
import db from '../Config/databas.js'; 

const FaleConosco = db.define('FaleConosco', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default FaleConosco;