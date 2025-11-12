import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import { registerHelpers } from './Config/helpers.js';

import cardapioRoutes from './Routes/cardapioRoutes.js';
import sequelize from './Config/databas.js';
import routes from './Routes/index.js';
import reservaRoutes from './Routes/reservaRoutes.js';
import faleConoscoRoutes from './Routes/faleConoscoRoutes.js';
import autenticarRoutes from './Routes/autenticarRoutes.js';
import pedidoRoutes from './Routes/pedidoRoutes.js';

import Reserva from './Models/Reserva.js';
import FaleConosco from './Models/FaleConosco.js';
import User from './Models/User.js';
import Cardapio from './Models/Cardapio.js';
import Pedido from './Models/Pedido.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------------------------------------------
// 🗄️ Conexão e sincronização com o banco de dados
// -----------------------------------------------------------------------------
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');

    await Reserva.sync({ force: false });
    console.log("✅ Tabela 'Reservas' sincronizada com sucesso!");

    await Cardapio.sync({ force: false });
    console.log("✅ Tabela 'Cardapio' sincronizada com sucesso!");

    await Pedido.sync({ force: false });
    console.log("✅ Tabela 'Pedido' sincronizada com sucesso!");

    await User.sync({ force: false });
    console.log("✅ Tabela 'User' sincronizada com sucesso!");

    await FaleConosco.sync({ force: false });
    console.log("✅ Tabela 'FaleConosco' sincronizada com sucesso!");

    // 👇 Seed de usuários de teste
    const testUsers = [
      { nome: 'admin', senha: '123', tipo: 'Admin' },
      { nome: 'bianca', senha: '123', tipo: 'User' }
    ];

    for (const testUser of testUsers) {
      const existingUser = await User.findOne({ where: { nome: testUser.nome } });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(testUser.senha, 12);
        await User.create({
          nome: testUser.nome,
          senha: hashedPassword,
          tipo: testUser.tipo
        });
        console.log(`✨ Usuário '${testUser.nome}' criado com sucesso! (Senha: 123)`);
      } else {
        console.log(`ℹ️ Usuário '${testUser.nome}' já existe. Ignorando criação.`);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  }
})();

// -----------------------------------------------------------------------------
// ⚙️ Configuração do Handlebars
// -----------------------------------------------------------------------------
const hbsEngine = engine({
  extname: '.handlebars', // garante compatibilidade
  defaultLayout: 'main',
  partialsDir: [path.join(__dirname, 'Views/partials')],
});

registerHelpers(hbsEngine.handlebars); // ✅ Corrigido: passa a instância correta

app.engine('handlebars', hbsEngine);
app.set('view engine', 'handlebars'); // ⚠️ Corrigido: era 'View engine' (maiúsculo errado)
app.set('views', path.join(__dirname, 'Views')); // ⚠️ Corrigido: era 'Views' com maiúsculo

app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------------------------------------------------
// 🧩 Middlewares
// -----------------------------------------------------------------------------
app.use(session({
  secret: 'sua-chave-secreta-muito-secreta', // Corrigido: tinha erro de digitação
  resave: false,
  saveUninitialized: false,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// -----------------------------------------------------------------------------
// 🚏 Rotas
// -----------------------------------------------------------------------------
app.use('/fale', faleConoscoRoutes);
app.use('/reserva', reservaRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/login', autenticarRoutes);
app.use('/cardapio', cardapioRoutes);
app.use('/', routes); // mantém por último

// -----------------------------------------------------------------------------
// 🚀 Inicialização do servidor
// -----------------------------------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
