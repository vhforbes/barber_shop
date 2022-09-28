import { AppDataSource } from "../data-source";
import Appointment from "../models/Appointment";

const AppointmentsRepository = AppDataSource.getRepository(Appointment).extend({
  // Personalized methods
  async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  },
});

// const AppointmentsRepository = AppDataSource.getRepository(Appointment);

export default AppointmentsRepository;
