
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Arena {
    arenaId?: Nullable<number>;
    arenaName?: Nullable<string>;
    arenaCity?: Nullable<string>;
    arenaState?: Nullable<string>;
    arenaCountry?: Nullable<string>;
    arenaTimezone?: Nullable<string>;
}

export class Official {
    personId?: Nullable<number>;
    name?: Nullable<string>;
    nameI?: Nullable<string>;
    firstName?: Nullable<string>;
    familyName?: Nullable<string>;
    jerseyNum?: Nullable<string>;
    assignment?: Nullable<string>;
}

export class Player {
    personId?: Nullable<number>;
    firstName?: Nullable<string>;
    familyName?: Nullable<string>;
    jerseyNum?: Nullable<string>;
    position?: Nullable<string>;
    points?: Nullable<number>;
    assists?: Nullable<number>;
    rebounds?: Nullable<number>;
    nameI?: Nullable<string>;
    playerSlug?: Nullable<string>;
    comment?: Nullable<string>;
    statistics?: Nullable<PlayerStatistics>;
}

export class Period {
    period?: Nullable<number>;
    score?: Nullable<number>;
    periodType?: Nullable<number>;
}

export class Statistics {
    fieldGoalsMade?: Nullable<number>;
    fieldGoalsAttempted?: Nullable<number>;
    threePointersMade?: Nullable<number>;
    threePointersAttempted?: Nullable<number>;
    freeThrowsMade?: Nullable<number>;
    freeThrowsAttempted?: Nullable<number>;
    rebounds?: Nullable<number>;
    assists?: Nullable<number>;
    steals?: Nullable<number>;
    blocks?: Nullable<number>;
    turnovers?: Nullable<number>;
    fouls?: Nullable<number>;
}

export class Team {
    teamId?: Nullable<number>;
    teamName?: Nullable<string>;
    teamCity?: Nullable<string>;
    teamTricode?: Nullable<string>;
    score?: Nullable<number>;
    inBonus?: Nullable<string>;
    timeoutsRemaining?: Nullable<number>;
    periods?: Nullable<Nullable<Period>[]>;
    players?: Nullable<Nullable<Player>[]>;
    statistics?: Nullable<Statistics>;
}

export class PlayerStatistics {
    minutes?: Nullable<string>;
    fieldGoalsMade?: Nullable<number>;
    fieldGoalsAttempted?: Nullable<number>;
    fieldGoalsPercentage?: Nullable<number>;
    threePointersMade?: Nullable<number>;
    threePointersAttempted?: Nullable<number>;
    threePointersPercentage?: Nullable<number>;
}

export class FinalGameTeam {
    teamId?: Nullable<number>;
    teamCity?: Nullable<string>;
    teamName?: Nullable<string>;
    teamTricode?: Nullable<string>;
    teamSlug?: Nullable<string>;
    players?: Nullable<Nullable<Player>[]>;
}

export class BoxScoreTraditional {
    gameId?: Nullable<string>;
    awayTeamId?: Nullable<number>;
    homeTeamId?: Nullable<number>;
    homeTeam?: Nullable<FinalGameTeam>;
    awayTeam?: Nullable<FinalGameTeam>;
}

export class LiveGame {
    gameId?: Nullable<string>;
    gameTimeLocal?: Nullable<string>;
    gameTimeUTC?: Nullable<string>;
    gameTimeHome?: Nullable<string>;
    gameTimeAway?: Nullable<string>;
    gameEt?: Nullable<string>;
    duration?: Nullable<number>;
    gameCode?: Nullable<string>;
    gameStatusText?: Nullable<string>;
    gameStatus?: Nullable<number>;
    regulationPeriods?: Nullable<number>;
    period?: Nullable<number>;
    gameClock?: Nullable<string>;
    attendance?: Nullable<number>;
    sellout?: Nullable<string>;
    arena?: Nullable<Arena>;
    officials?: Nullable<Nullable<Official>[]>;
    homeTeam?: Nullable<Team>;
    awayTeam?: Nullable<Team>;
}

export class Leaders {
    personId?: Nullable<number>;
    name?: Nullable<string>;
    jerseyNum?: Nullable<string>;
    position?: Nullable<string>;
    teamTricode?: Nullable<string>;
    playerSlug?: Nullable<string>;
    points?: Nullable<number>;
    rebounds?: Nullable<number>;
    assists?: Nullable<number>;
}

export class GameLeaders {
    homeLeaders?: Nullable<Leaders>;
    awayLeaders?: Nullable<Leaders>;
}

export class PbOdds {
    team?: Nullable<string>;
    odds?: Nullable<number>;
    suspended?: Nullable<number>;
}

export class LiveScoreBoardGame {
    gameId?: Nullable<string>;
    gameCode?: Nullable<string>;
    gameStatus?: Nullable<number>;
    gameStatusText?: Nullable<string>;
    period?: Nullable<number>;
    gameClock?: Nullable<string>;
    gameTimeUTC?: Nullable<string>;
    gameEt?: Nullable<string>;
    regulationPeriods?: Nullable<number>;
    ifNecessary?: Nullable<boolean>;
    seriesGameNumber?: Nullable<string>;
    gameLabel?: Nullable<string>;
    gameSubLabel?: Nullable<string>;
    seriesText?: Nullable<string>;
    seriesConference?: Nullable<string>;
    poRoundDesc?: Nullable<string>;
    gameSubtype?: Nullable<string>;
    homeTeam?: Nullable<Team>;
    awayTeam?: Nullable<Team>;
    gameLeaders?: Nullable<GameLeaders>;
    pbOdds?: Nullable<PbOdds>;
}

export abstract class IQuery {
    abstract game(gameId: string): Nullable<Game> | Promise<Nullable<Game>>;
}

export abstract class ISubscription {
    abstract gameUpdated(gameId: string): Nullable<LiveScoreBoardGame> | Promise<Nullable<LiveScoreBoardGame>>;
}

export type Game = LiveGame | BoxScoreTraditional;
type Nullable<T> = T | null;
