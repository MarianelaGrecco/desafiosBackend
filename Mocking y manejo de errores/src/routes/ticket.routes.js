import { Router } from "express";
import { ticketModel } from "../persistencia/mongoDB/models/ticket.model.js";

const ticketRouter = Router();

ticketRouter.get("/:tid", async (req, res) => {
  try {
    const ticket = await ticketModel.findById(req.params.tid);
    res.json(ticket);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

ticketRouter.post("/", async (req, res) => {
  try {
    const newTicket = await ticketModel.create(req.body);
    res.send(newTicket);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

ticketRouter.put("/:tid", async (req, res) => {
  try {
    const updatedTicket = await ticketModel.findByIdAndUpdate(
      req.params.tid,
      req.body,
      { new: true }
    );
    res.send(updatedTicket);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

ticketRouter.delete("/:tid", async (req, res) => {
  try {
    const removedTicket = await ticketModel.findByIdAndRemove(req.params.tid);
    res.send(removedTicket);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default ticketRouter;

