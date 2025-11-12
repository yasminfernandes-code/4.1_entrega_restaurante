// Controllers/authController.js
import User from '../Models/User.js';
import bcrypt from 'bcryptjs'; // Importe para criptografia

// ------------------- ROTAS GET (VIEWS) -------------------
export const novologin = (req, res) => {
  res.render('loginNew', { error: req.session.loginError });
  req.session.loginError = null; // Limpa o erro após exibir
};

export const novoregister = (req, res) => {
  res.render('register');
};

// ------------------- ROTA POST (REGISTRO) -------------------
import chalk from 'chalk'; // instale com: npm install chalk

export const addregister = async (req, res) => {
  const { nome, senha, tipo } = req.body;
  console.log(chalk.blueBright('\n🟢 [REGISTRO] Requisição recebida com os dados:'), { nome, tipo });

  try {
    const existingUser = await User.findOne({ where: { nome } });
    if (existingUser) {
      console.log(chalk.yellow('⚠️ Usuário já existe no banco:'), existingUser.nome);
      return res.render('register', { error: 'Usuário já existe ou ocorreu um problema' });
    }

    const hashedPassword = await bcrypt.hash(senha, 12);
    console.log(chalk.green('🔒 Senha criptografada com sucesso!'));

    const novoUser = await User.create({
      nome,
      senha: hashedPassword,
      tipo: tipo || 'User'
    });

    console.log(chalk.greenBright('✅ Novo usuário registrado no banco:'), novoUser.toJSON());
    res.redirect('/login');
  } catch (err) {
    console.error(chalk.red('❌ Erro ao registrar usuário:'), err);
    res.render('register', { error: 'Erro ao registrar usuário' });
  }
};

// ------------------- ROTA POST (LOGIN) -------------------
export const addlogin = async (req, res) => {
  const { nome, senha } = req.body;
  console.log(chalk.cyan('\n🔵 [LOGIN] Tentando logar usuário:'), nome);

  try {
    const user = await User.findOne({ where: { nome } });

    if (!user) {
      console.log(chalk.red('❌ Usuário não encontrado no banco.'));
      req.session.loginError = 'Usuário ou senha inválidos';
      return res.redirect('/login');
    }

    console.log(chalk.green('✅ Usuário encontrado:'), user.nome);
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (isMatch) {
      console.log(chalk.greenBright('🟢 Senha correta! Login bem-sucedido.'));
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save(err => {
        if (err) console.error(chalk.red('Erro ao salvar sessão:'), err);
        res.redirect('/');
      });
    } else {
      console.log(chalk.yellow('⚠️ Senha incorreta para o usuário:'), nome);
      req.session.loginError = 'Usuário ou senha inválidos';
      return res.redirect('/login');
    }
  } catch (err) {
    console.error(chalk.red('❌ Erro no servidor durante o login:'), err);
    req.session.loginError = 'Ocorreu um erro no servidor';
    res.redirect('/login');
  }
};



// ------------------- ROTA POST (LOGOUT) -------------------
export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/login'); // Redireciona para o login
  });
};