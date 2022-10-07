import { parseISO, startOfHour } from "date-fns";
import { AppDataSource } from "../data-source";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

/**
 * [x] Recebe as infos da chamada
 * [x] Tratativa de erros/excessoes, logicas de negcio, ifs
 * [x] Acesso ao repositorio
 */

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmetService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    // Transforma a data em um horario inicial, 9:15 => 9:00
    const appointmentDate = startOfHour(date);

    // Nao permitir um book de diversos appointments na mesma hora.
    // 1 hora de intervalo entre eles
    // Usa o metodo customizado do repositorio findByDate
    const findAppointmentInSameDate = await AppointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = AppointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    const results = await AppDataSource.getRepository(Appointment).save(
      appointment
    );

    return results;
  }
}

export default CreateAppointmetService;
