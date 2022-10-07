import { AppDataSource } from "../data-source";
import Appointment from "../models/Appointment";

const AppointmentsRepository = AppDataSource.getRepository(Appointment).extend({
  // Personalized methods:
  // S'o necessario quando existe um metodo (query) extra como esse

  async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  },
});

export default AppointmentsRepository;
