import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "./output.dto";

@InputType()
export class SubscribeInput {
    @Field(type => Number)
    podcastId: number;
}

@ObjectType()
export class SubscribeOutput extends CoreOutput {}