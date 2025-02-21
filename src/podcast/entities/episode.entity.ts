import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from './core.entity';
import { Podcast } from './podcast.entity';

@Entity()
@ObjectType()
export class Episode extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsString()
  title: string;

  @Column()
  @Field(type => String)
  @IsString()
  category: string;

  @ManyToOne(() => Podcast, podcast => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  @Field(type => Podcast)
  podcast: Podcast;

  @ManyToMany(type => User, user => user.watchedEpisodes, {nullable: true})
  @JoinTable()
  @Field(type => [User], {nullable: true})
  watchedUsers?: User[]
}
