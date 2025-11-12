import Reserva from "../Models/Reserva.js";
export const novaReserva = (req, res) => {
  res.render("reservaNew"); 
};

export const addReserva = async (req, res) => {
  try {
    const { nome, telefone, data, horario, pessoas } = req.body;

    await Reserva.create({ nome, telefone, data, horario, pessoas });

    res.redirect("/reserva/sucesso");
  } catch (error) {
    console.error(error);
    res.send("Erro ao realizar reserva.");
  }
};
