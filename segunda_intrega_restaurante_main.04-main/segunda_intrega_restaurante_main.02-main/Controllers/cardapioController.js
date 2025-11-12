// Controllers/cardapioController.js
import Cardapio from "../Models/Cardapio.js";
import chalk from 'chalk'; 

// C - Create (Formulário)
export const newCardapioItem = (req, res) => {
  res.render("cardapioNew", { session: req.session });
};

// C - Create (Ação)
export const addCardapioItem = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria } = req.body;
    await Cardapio.create({ nome, descricao, preco, categoria });
    console.log(chalk.greenBright('✅ Item de Cardápio registrado com sucesso:'), nome);
    res.redirect("/cardapio/admin"); // Redireciona para a lista de gerenciamento
  } catch (error) {
    console.error(chalk.red('❌ Erro ao adicionar item do Cardápio:'), error);
    res.render('erro', { mensagem: 'Erro ao adicionar item do Cardápio.' });
  }
};

// R - Read (Listagem para Admin)
export const listCardapioAdmin = async (req, res) => {
  try {
    const itens = await Cardapio.findAll({ raw: true }); // raw: true para facilitar no Handlebars
    res.render("cardapioAdminList", { itens, session: req.session });
  } catch (error) {
    console.error(chalk.red('❌ Erro ao listar itens do Cardápio para Admin:'), error);
    res.render('erro', { mensagem: 'Erro ao listar Cardápio.' });
  }
};

// U - Update (Formulário)
export const editCardapioItem = async (req, res) => {
    try {
        const item = await Cardapio.findByPk(req.params.id, { raw: true });
        if (!item) {
            return res.render('erro', { mensagem: 'Item de Cardápio não encontrado.' });
        }
        res.render('cardapioEdit', { item, session: req.session });
    } catch (error) {
        console.error(chalk.red('❌ Erro ao buscar item para edição:'), error);
        res.render('erro', { mensagem: 'Erro ao buscar item.' });
    }
};

// U - Update (Ação)
export const updateCardapioItem = async (req, res) => {
    try {
        const { nome, descricao, preco, categoria } = req.body;
        await Cardapio.update({ nome, descricao, preco, categoria }, {
            where: { id: req.params.id }
        });
        console.log(chalk.blueBright(`🔄 Item de Cardápio ID ${req.params.id} atualizado.`));
        res.redirect("/cardapio/admin"); 
    } catch (error) {
        console.error(chalk.red('❌ Erro ao atualizar item:'), error);
        res.render('erro', { mensagem: 'Erro ao atualizar item.' });
    }
};

// D - Delete
export const deleteCardapioItem = async (req, res) => {
    try {
        const result = await Cardapio.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            console.log(chalk.yellow(`⚠️ Tentativa de excluir item ID ${req.params.id}, mas não foi encontrado.`));
            return res.render('erro', { mensagem: 'Item de Cardápio não encontrado para exclusão.' });
        }
        console.log(chalk.redBright(`🗑️ Item de Cardápio ID ${req.params.id} excluído com sucesso.`));
        res.redirect("/cardapio/admin"); 
    } catch (error) {
        console.error(chalk.red('❌ Erro ao excluir item:'), error);
        res.render('erro', { mensagem: 'Erro ao excluir item.' });
    }
};