import { v4 } from "uuid";

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // Omit => Omite o id do model Apointment
  constructor({ provider, date }: Omit<Appointment, "id">) {
    this.id = v4();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
