import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render('home', { mensagem: 'Bem-vindo ao Restaurante mefistofoles e fausto!' }); 
});


router.get('/cardapio', (req, res) => {
  res.render('cardapio'); 
});

router.get('/fale/New', (req, res) => {
  res.render('faleNew'); 
});



export default router;