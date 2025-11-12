import { Router } from 'express';
import { novoFaleConosco, addFaleConosco } from '../Controllers/faleConoscoController.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = Router();

router.get('/new',isLoggedIn, novoFaleConosco); // Rota para o formulário
router.post('/add',isLoggedIn, addFaleConosco); // Rota para salvar os dados

export default router;