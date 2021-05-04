import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export default class VerificationRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  identifier: string;

  @Column({ unique: true })
  token: string;

  @Column({ type: "timestamp" })
  expiresOn: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
