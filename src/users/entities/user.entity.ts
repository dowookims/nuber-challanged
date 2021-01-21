import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';
import { Column, Entity, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { CoreEntity } from './core.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Podcast } from 'src/podcast/entities/podcast.entity';
import { Review } from 'src/podcast/entities/review.entity';
import { Episode } from 'src/podcast/entities/episode.entity';

export enum UserRole {
  Host = 'Host',
  Listener = 'Listener',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(type => String)
  @IsString()
  password: string;

  @Column({ type: 'simple-enum', enum: UserRole })
  @Field(type => UserRole)
  role: UserRole;

  @ManyToMany(type => Podcast, podcast => podcast.subscribers, { nullable: true })
  @JoinTable()
  @Field(type => [Podcast], { nullable: true})
  subscriptions?: Podcast [];

  @ManyToMany(type => Episode, episode => episode.watchedUsers, { nullable: true })
  @JoinTable()
  @Field(type => [Podcast], { nullable: true})
  watchedEpisodes?: Podcast [];

  @OneToMany(() => Review, review => review.writer, { nullable: true })
  @Field(type => [Review], { nullable: true})
  reviews?: Review[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) {
      return;
    }
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
