import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "./output.dto";

@InputType()
export class MarkEpisodeAsPlayedInput {
    @Field(type => Number)
    podcastId: number;

    @Field(type => Number)
    episodeId: number;
}

@ObjectType()
export class MarkEpisodeAsPlayedOutput extends CoreOutput {}