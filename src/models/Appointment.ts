// import { v4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

// Decorator => A classe é um parametro sendo passado para o decorator Entity
@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: 'provider_id' })
  provider: string;

  @Column("timestamp with time zone")
  date: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
