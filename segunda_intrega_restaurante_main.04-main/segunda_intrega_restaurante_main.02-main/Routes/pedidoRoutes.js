// Routes/pedidoRoutes.js
import { Router } from "express";
import { 
    novoPedido, 
    addPedido, 
    listPedidosAdmin, // NOVO: Importa função de listar Admin
    updateStatus,     // NOVO: Importa função de atualizar status
    deletePedido      // NOVO: Importa função de deletar
} from "../Controllers/pedidoController.js";
import { isLoggedIn, isAdmin } from '../middlewares/auth.js'; // Importa isAdmin

const router = Router();

// Rotas do 'User' (existentes)
router.get("/new", isLoggedIn, novoPedido);
router.post("/add", isLoggedIn, addPedido);

router.get("/sucesso", (req, res) => {
  res.render("sucesso", { mensagem: 'Seu pedido foi realizado com sucesso e será processado!' });
});

// NOVO: Rotas de Gerenciamento do Admin
router.get("/admin", isAdmin, listPedidosAdmin); // R - Read (Listagem de pedidos)
router.post("/status/:id", isAdmin, updateStatus); // U - Update (Atualizar status)
router.post("/delete/:id", isAdmin, deletePedido); // D - Delete

export default router;