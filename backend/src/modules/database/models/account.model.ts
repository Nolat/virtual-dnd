import { Field, ID, ObjectType } from "@nestjs/graphql";
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

import User from "./user.model";

@Entity()
@ObjectType()
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  providerType: string;

  @Column()
  @Field()
  providerId: string;

  @Column()
  @Field()
  providerAccountId: string;

  @Column({ nullable: true })
  @Field()
  refreshToken: string;

  @Column({ nullable: true })
  @Field()
  accessToken: string;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  accessTokenExpiresOn: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
