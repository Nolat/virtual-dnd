import { randomBytes } from "crypto";

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import User from "./User.model";

@Entity()
export default class Session extends BaseEntity {
  constructor() {
    super();
    this.sessionToken = randomBytes(32).toString("hex");
    this.accessToken = randomBytes(32).toString("hex");
  }

  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: "timestamp" })
  expiresOn: Date;

  @Column({ unique: true })
  sessionToken: string;

  @Column({ unique: true })
  accessToken: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
