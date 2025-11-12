import FaleConosco from '../Models/FaleConosco.js';


export const novoFaleConosco = (req, res) => {
  res.render('faleNew'); 
};

export const addFaleConosco = async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;

    await FaleConosco.create({ nome, email, mensagem });

    res.render('sucesso', { mensagem: 'Sua mensagem foi enviada com sucesso ao faleconosco!' });
  } catch (error) {
    console.error(error);
    res.render('erro', { mensagem: 'Erro ao enviar a mensagem.' });
  }
};