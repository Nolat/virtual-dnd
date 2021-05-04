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
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  providerType: string;

  @Column()
  providerId: string;

  @Column()
  providerAccountId: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ type: "timestamp", nullable: true })
  accessTokenExpiresOn: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
