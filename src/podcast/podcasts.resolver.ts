import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PodcastsService } from "./podcasts.service";
import { Podcast } from "./entities/podcast.entity";
import {
  CreatePodcastInput,
  CreatePodcastOutput
} from "./dtos/create-podcast.dto";
import { CoreOutput } from "./dtos/output.dto";
import {
  PodcastSearchInput,
  PodcastOutput,
  EpisodesOutput,
  EpisodesSearchInput,
  GetAllPodcastsOutput
} from "./dtos/podcast.dto";
import { UpdatePodcastInput } from "./dtos/update-podcast.dto";
import { Episode } from "./entities/episode.entity";
import {
  CreateEpisodeInput,
  CreateEpisodeOutput
} from "./dtos/create-episode.dto";
import { UpdateEpisodeInput } from "./dtos/update-episode.dto";
import { Role } from "src/auth/role.decorator";
import { SearchPodcastsInput, SearchPodcastsOutput } from "./dtos/search-podcasts.dto";
import { SubscribeInput, SubscribeOutput } from "./dtos/subscribe.dto";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { ReviewPodcastInput, ReviewPodcastOutput } from "./dtos/review-podcast.dto";
import { MarkEpisodeAsPlayedInput, MarkEpisodeAsPlayedOutput } from "./dtos/mark-episode-as-played.dto";

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => GetAllPodcastsOutput)
  getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CreatePodcastOutput)
  @Role(["Host"])
  createPodcast(
    @Args("input") createPodcastInput: CreatePodcastInput
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query((returns) => PodcastOutput)
  getPodcast(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<PodcastOutput> {
    return this.podcastsService.getPodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  @Role(["Host"])
  deletePodcast(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<CoreOutput> {
    return this.podcastsService.deletePodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  @Role(["Host"])
  updatePodcast(
    @Args("input") updatePodcastInput: UpdatePodcastInput
  ): Promise<CoreOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }

  @Query((returns) => SearchPodcastsOutput)
  searchPodcasts(
    @Args('input') searchPodcastsInput: SearchPodcastsInput
  ): Promise<SearchPodcastsOutput> {
    return this.podcastsService.searchPodcastsByTitle(searchPodcastsInput);
  }

  @Role(["Any"])
  @Mutation((returns) => SubscribeOutput)
  subscribePodcast(
    @AuthUser() authUser: User,
    @Args('input') subscribeInput: SubscribeInput
  ): Promise<SubscribeOutput> {
    return this.podcastsService.subscribePodcast(authUser, subscribeInput)
  }

  @Role(["Any"])
  @Mutation((returns) => ReviewPodcastOutput)
  reviewPodcast(
    @AuthUser() authUser: User,
    @Args('input') reviewPodcastInput: ReviewPodcastInput
  ): Promise<ReviewPodcastOutput> {
    return this.podcastsService.createReview(authUser, reviewPodcastInput);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query((returns) => EpisodesOutput)
  getEpisodes(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<EpisodesOutput> {
    return this.podcastService.getEpisodes(podcastSearchInput.id);
  }

  @Mutation((returns) => CreateEpisodeOutput)
  @Role(["Host"])
  createEpisode(
    @Args("input") createEpisodeInput: CreateEpisodeInput
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Mutation((returns) => CoreOutput)
  @Role(["Host"])
  updateEpisode(
    @Args("input") updateEpisodeInput: UpdateEpisodeInput
  ): Promise<CoreOutput> {
    return this.podcastService.updateEpisode(updateEpisodeInput);
  }

  @Mutation((returns) => CoreOutput)
  @Role(["Host"])
  deleteEpisode(
    @Args("input") episodesSearchInput: EpisodesSearchInput
  ): Promise<CoreOutput> {
    return this.podcastService.deleteEpisode(episodesSearchInput);
  }

  @Mutation((returns) => MarkEpisodeAsPlayedOutput)
  @Role(["Any"])
  markEpisodeAsPlayed(
    @AuthUser() authUser: User,
    @Args("input") markEpisodeAsPlayedInput: MarkEpisodeAsPlayedInput
  ): Promise<MarkEpisodeAsPlayedOutput> {
    return this.podcastService.markEpisodeAsPlayed(authUser, markEpisodeAsPlayedInput);
  }
}
