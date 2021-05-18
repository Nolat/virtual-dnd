import { randomBytes } from "crypto";

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn
} from "typeorm";

import { User } from "modules/api/models";

@Entity()
export default class Session extends BaseEntity {
  constructor() {
    super();
    this.sessionToken = randomBytes(32).toString("hex");
    this.accessToken = randomBytes(32).toString("hex");
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @RelationId((session: Session) => session.user)
  userId: string;

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
