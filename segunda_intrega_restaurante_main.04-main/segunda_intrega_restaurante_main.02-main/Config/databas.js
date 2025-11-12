import { Sequelize } from 'sequelize';
import chalk from 'chalk'; // Garante que você pode usar o chalk

const sequelize = new Sequelize('conexao3', 'root', 'Ed153699', {//criar conexao3
  host: 'localhost',
  dialect: 'mysql',
  // 💡 ADICIONADO PARA DEBUG: Mostra todas as queries SQL executadas
  logging: (msg) => console.log(chalk.yellow(`[SQL LOG] ${msg}`)), 
});

export default sequelize;

// O bloco try/catch abaixo deve ser removido ou movido para app.js
// pois ele é executado fora do contexto do Node, mas vamos deixá-lo para sua referência
try {
  // await sequelize.authenticate(); // Melhor fazer isso apenas no app.js
  // console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
} catch (error) {
  // console.error('❌ Não foi possível conectar ao banco de dados:', error);
}