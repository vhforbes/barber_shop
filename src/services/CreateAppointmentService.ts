import { parseISO, startOfHour } from "date-fns";
import { AppDataSource } from "../data-source";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

/**
 * [x] Recebimento das informacoes
 * [x] Tratativa de erros/excessoes
 * [x] Acesso ao repositorio
 */

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmetService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await AppointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = AppointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    const results = await AppDataSource.getRepository(Appointment).save(
      appointment
    );

    return results;
  }
}

export default CreateAppointmetService;
