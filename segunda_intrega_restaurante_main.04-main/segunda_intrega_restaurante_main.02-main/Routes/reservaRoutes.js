
import { Router } from "express";
import { novaReserva, addReserva } from "../Controllers/reservaController.js";
import { isLoggedIn } from '../middlewares/auth.js'; 

const router = Router();


router.get("/new", isLoggedIn, novaReserva); 
router.post("/add", isLoggedIn, addReserva);

router.get("/sucesso", (req, res) => {
  res.render("sucesso");
});

export default router;