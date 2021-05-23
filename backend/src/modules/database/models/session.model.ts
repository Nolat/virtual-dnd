import { randomBytes } from "crypto";

import { Field, ID, ObjectType } from "@nestjs/graphql";
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

import User from "./user.model";

@Entity()
@ObjectType()
export default class Session extends BaseEntity {
  constructor() {
    super();
    this.sessionToken = randomBytes(32).toString("hex");
    this.accessToken = randomBytes(32).toString("hex");
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @RelationId((session: Session) => session.user)
  @Field()
  userId: string;

  @Column({ type: "timestamp" })
  @Field()
  expiresOn: Date;

  @Column({ unique: true })
  @Field()
  sessionToken: string;

  @Column({ unique: true })
  @Field()
  accessToken: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
