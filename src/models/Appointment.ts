// import { v4 } from "uuid";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Decorator => A classe é um parametro sendo passado para a Entity
@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column("time with time zone")
  date: Date;
}

export default Appointment;
