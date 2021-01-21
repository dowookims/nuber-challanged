import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Podcast } from "src/podcast/entities/podcast.entity";
import { Review } from "src/podcast/entities/review.entity";
import { CoreOutput } from "./output.dto";

@InputType()
export class SeeSubscriptionInput {
    @Field(type => Number)
    userId: number;
}

@ObjectType()
export class SeeSubscriptionOutput extends CoreOutput {
    @Field(type => [Podcast], { nullable: true})
    podcasts?: Podcast [];

    @Field(type => [Review], { nullable: true })
    reviews?: Review[];
}