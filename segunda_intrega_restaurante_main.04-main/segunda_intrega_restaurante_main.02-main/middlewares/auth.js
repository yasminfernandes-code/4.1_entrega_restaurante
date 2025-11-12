// auth.js

export const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.isLoggedIn === true) { 
    return next(); 
  }
  
  req.session.loginError = 'Você precisa estar logado para acessar esta página.';
  res.redirect('/login');
};

// NOVO: Middleware para verificar se o usuário é Admin
export const isAdmin = (req, res, next) => {
  // Verifica se está logado E se o tipo de usuário é 'Admin'
  if (req.session && req.session.isLoggedIn === true && req.session.user && req.session.user.tipo === 'Admin') {
    return next();
  }
  
  // Se não for Admin ou não estiver logado, redireciona ou envia erro
  // Como as rotas de Admin também exigem login, a mensagem de erro deve ser mais específica.
  req.session.loginError = 'Acesso negado: Você não tem permissão de Administrador.';
  res.redirect('/'); // Redireciona para home ou login
};