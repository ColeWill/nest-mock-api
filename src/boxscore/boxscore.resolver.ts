import { BoxScoreTraditional, LiveGame, LiveScoreBoardGame } from '../graphql';
import { Resolver, Query, Args, ResolveField, Parent, Subscription } from '@nestjs/graphql';
import { BoxScoreService } from './boxscore.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('GameWithMeta')
export class BoxScoreResolver {
  constructor(private readonly boxScoreService: BoxScoreService) {}

  @Query('game')
  async getGame(@Args('gameId') gameId: string): Promise<BoxScoreTraditional | LiveGame | LiveScoreBoardGame | null> {
    const gameData = await this.boxScoreService.getBoxScore(gameId, false);
    return gameData;
  }

  @Subscription('gameUpdated')
  async gameUpdated(@Args('gameId') gameId: string) {

    setInterval(async ()=> {
      const gameData = await this.boxScoreService.getBoxScore(gameId, true);
      pubSub.publish('gameUpdated', {gameUpdated: gameData});
    }, 8000);
    
    return pubSub.asyncIterator('gameUpdated');
  }
}

@Resolver('Game')
export class GameResolver {
  @ResolveField()
  __resolveType(@Parent() gameData: BoxScoreTraditional | LiveGame) {
    if ('homeTeam' in gameData && 'awayTeam' in gameData && 'teamSlug' in gameData.homeTeam) {
      return 'BoxScoreTraditional';
    }
    if ('gameStatus' in gameData) {
      return 'LiveGame';
    }
    return null;
  }
}