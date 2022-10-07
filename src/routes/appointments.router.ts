import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmetService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = AppointmentsRepository;

// Responsibilidade das rotas:
// receber requisicao
// chamar o service responsavel pelo determinado CRUD
// devolver uma resposta ao client

appointmentsRouter.get("/", async (req, res) => {
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post("/", async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmetService();

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
});

export default appointmentsRouter;
