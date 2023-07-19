import { ticketService } from "../services/ticket.service.js";

// Controlador para crear un nuevo ticket
async function createTicket(req, res) {
  const { code, amount, purchaser } = req.body;

  try {
    const ticket = await ticketService.createTicket(code, amount, purchaser);
    res.render("ticket", {ticket});
  } catch (error) {
    res.status(500).json({ error: "Failed to create ticket" });
  }
}

export default {
  createTicket,
};
