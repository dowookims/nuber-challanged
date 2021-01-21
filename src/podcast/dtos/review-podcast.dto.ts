import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Review } from "../entities/review.entity";
import { CoreOutput } from "./output.dto";

@InputType()
export class ReviewPodcastInput extends  PickType(Review, ['title', 'content', 'rating'], InputType) {
    @Field(type => Number)
    podcastId: number;
}

@ObjectType()
export class ReviewPodcastOutput extends CoreOutput {}