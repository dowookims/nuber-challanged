import { Episode } from './episode.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, Min, Max, IsNumber } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { CoreEntity } from './core.entity';
import { User } from 'src/users/entities/user.entity';
import { Review } from './review.entity';

@Entity()
@ObjectType()
export class Podcast extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsString()
  title: string;

  @Column()
  @Field(type => String)
  @IsString()
  category: string;

  @Column({ default: 0 })
  @Field(type => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @OneToMany(() => Episode, episode => episode.podcast)
  @Field(type => [Episode])
  episodes: Episode[];

  @OneToMany(() => Review, review => review.podcast)
  @Field(type => [Review])
  reviews: Review[];

  @ManyToMany(type => User, user => user.subscriptions, {nullable: true})
  @JoinTable()
  @Field(type => [User], {nullable: true})
  subscribers?: User[]
}
