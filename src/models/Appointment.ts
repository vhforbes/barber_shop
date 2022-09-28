// import { v4 } from "uuid";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Decorator => A classe é um parametro sendo passado para o decorator Entity
@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column("timestamp")
  date: any;
}

export default Appointment;
