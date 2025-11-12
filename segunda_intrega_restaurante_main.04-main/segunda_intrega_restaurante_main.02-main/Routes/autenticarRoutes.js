
import { Router } from 'express';
import { novologin, addlogin, novoregister, addregister, logout } from '../Controllers/autenticarController.js';

const router = Router();

router.get('/', novologin);
router.post('/add', addlogin);

router.get('/registerform', novoregister);
router.post('/addregister', addregister);

router.post('/logout', logout);

export default router;