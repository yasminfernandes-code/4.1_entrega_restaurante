// Controllers/pedidoController.js
import Pedido from "../Models/Pedido.js";
import chalk from 'chalk'; 

// Funções existentes para o 'User'
export const novoPedido = (req, res) => {
  res.render("pedidoNew", { session: req.session }); 
};

export const addPedido = async (req, res) => {
  // ... (código existente)
  // ...
};

// NOVO: R - Read (Listagem para Admin)
export const listPedidosAdmin = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({ 
        raw: true,
        order: [['status', 'ASC'], ['createdAt', 'DESC']] // Ordena por status e data
    }); 
    res.render("pedidosAdminList", { pedidos, session: req.session });
  } catch (error) {
    console.error(chalk.red('❌ Erro ao listar pedidos para Admin:'), error);
    res.render('erro', { mensagem: 'Erro ao listar pedidos.' });
  }
};

// NOVO: U - Update (Atualizar Status)
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Pedido.update({ status }, {
            where: { id: req.params.id }
        });
        console.log(chalk.blueBright(`🔄 Status do Pedido ID ${req.params.id} atualizado para: ${status}.`));
        res.redirect("/pedido/admin"); 
    } catch (error) {
        console.error(chalk.red('❌ Erro ao atualizar status:'), error);
        res.render('erro', { mensagem: 'Erro ao atualizar status.' });
    }
};

// NOVO: D - Delete
export const deletePedido = async (req, res) => {
    try {
        const result = await Pedido.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            console.log(chalk.yellow(`⚠️ Tentativa de excluir pedido ID ${req.params.id}, mas não foi encontrado.`));
            return res.render('erro', { mensagem: 'Pedido não encontrado para exclusão.' });
        }
        console.log(chalk.redBright(`🗑️ Pedido ID ${req.params.id} excluído com sucesso.`));
        res.redirect("/pedido/admin"); 
    } catch (error) {
        console.error(chalk.red('❌ Erro ao excluir pedido:'), error);
        res.render('erro', { mensagem: 'Erro ao excluir pedido.' });
    }
};