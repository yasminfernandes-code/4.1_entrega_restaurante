// Models/User.js
import { DataTypes } from 'sequelize';
import db from '../Config/databas.js'; 

const User = db.define('User', {
  nome: { // Use 'nome' para manter a consistência com os requisitos de teste
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: { // Use 'senha' para manter a consistência com os requisitos de teste
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: { // Adicione um campo para diferenciar Admin e User
    type: DataTypes.ENUM('Admin', 'User'),
    allowNull: false,
    defaultValue: 'User' 
  }
});

export default User;