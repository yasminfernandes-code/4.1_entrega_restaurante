// Routes/cardapioRoutes.js
import { Router } from "express";
import { 
    newCardapioItem, 
    addCardapioItem, 
    listCardapioAdmin, 
    editCardapioItem, 
    updateCardapioItem, 
    deleteCardapioItem 
} from "../Controllers/cardapioController.js";
import { isAdmin } from '../middlewares/auth.js'; // Usa o novo middleware isAdmin

const router = Router();

// Rotas de CRUD do Admin, protegidas por isAdmin
router.get("/admin", isAdmin, listCardapioAdmin); // R - Read (Listagem para Admin)

router.get("/new", isAdmin, newCardapioItem);    // C - Create (Formulário)
router.post("/add", isAdmin, addCardapioItem);   // C - Create (Ação)

router.get("/edit/:id", isAdmin, editCardapioItem); // U - Update (Formulário)
router.post("/update/:id", isAdmin, updateCardapioItem); // U - Update (Ação)

router.post("/delete/:id", isAdmin, deleteCardapioItem); // D - Delete

export default router;