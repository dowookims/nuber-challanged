import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Podcast } from "../entities/podcast.entity";
import { CoreOutput } from "./output.dto";

@InputType()
export class SearchPodcastsInput {
    @Field(type => String)
    query: string;
};

@ObjectType()
export class SearchPodcastsOutput extends CoreOutput {
    @Field(type => [Podcast], { nullable: true })
    podcasts?: Podcast[];
};