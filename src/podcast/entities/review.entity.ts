import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Podcast } from "./podcast.entity";

@Entity()
@ObjectType()
export class Review extends CoreEntity {
    @Field(type => String)
    @Column()
    @IsString()
    title: string;

    @Field(type => String)
    @Column()
    @IsString()
    content: string;

    @Field(type => Number)
    @Column()
    @IsNumber()
    rating: number

    @ManyToOne(
        () => User,
        user => user.reviews,
        {nullable: true, onDelete: 'CASCADE' }
    )
    @Field(type => User, {nullable: true})
    writer?: User;

    @ManyToOne(
        () => Podcast,
        podcast => podcast.reviews,
        {nullable: true, onDelete: 'CASCADE' }
    )
    @Field(type => Podcast, {nullable: true})
    podcast?: Podcast;
}