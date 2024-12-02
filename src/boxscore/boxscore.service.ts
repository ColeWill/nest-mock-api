import * as dotenv from 'dotenv';
dotenv.config();
import { LiveScoreBoardGame, BoxScoreTraditional, LiveGame } from '../graphql';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { readFileSync } from 'fs';
import  { join } from 'path';

const randomScore = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1));
const updateScore = (currentScore: number): number => {
    if (currentScore > 50) {
        return 0;
    } else {
        return currentScore + randomScore(1,3);
    }
}


@Injectable()
export class BoxScoreService {
    private liveGameResponse: any;

    constructor(private readonly httpService: HttpService){
        this.initializedLiveGameUpdater();
    }

    private initializedLiveGameUpdater() {
        const filePath = join(process.cwd(), 'src', 'boxscore', 'static_data', 'LiveScoreboard.json');
        const fileData = readFileSync(filePath, 'utf-8');
        const dataObj = JSON.parse(fileData);
        this.liveGameResponse = dataObj.scoreboard.games[0];
    }

    public async getBoxScore(gameId: string, isSubscription: boolean): Promise<BoxScoreTraditional | LiveGame | LiveScoreBoardGame | null> {
        try {
            const scheduleFilePath = join(process.cwd(),'src', 'boxscore', 'static_data', 'GameSchedule.json');
            const shceduleFileData = readFileSync(scheduleFilePath, 'utf-8');
            const gameSchedule = JSON.parse(shceduleFileData);

            let gameData: LiveGame | null = null;
            for (const gameDate of gameSchedule.leagueSchedule.gameDates) {
                for (const game of gameDate.games) {
                    if (game.gameId === gameId) {
                        gameData = game;
                        break;
                    }
                }
                if(gameData) break;
            }
            if(gameData.gameStatus === 3) {
                const finalGameResponse = await firstValueFrom(
                    this.httpService.get(
                        `http://stats.nba.com/stats/boxscoretraditionalv3?GameID=${gameId}&rangeType=0&startPeriod=0&endPeriod=0&startRange=0&endRange=0`,
                        {
                            headers: {
                                "X-Requested-With": process.env.X_REQUESTED_WITH,
                            }, 
                        }
                    )
                );
                const { boxScoreTraditional } = finalGameResponse.data;
                return boxScoreTraditional;
           
            }  
            
            if ((gameData.gameStatus === 2 || 1) && !isSubscription) {
                const filePath = join(process.cwd(), 'src', 'boxscore', 'static_data', 'boxScoreLive.json');
                const fileData = readFileSync(filePath, 'utf-8');
                const dataObj = JSON.parse(fileData);
                const { game } = dataObj;
                return game; 
            }
            
            if ((gameData.gameStatus === 2 || 1) && isSubscription) {
                this.liveGameResponse.homeTeam.periods[3].score = updateScore(this.liveGameResponse.homeTeam.periods[3].score);
                this.liveGameResponse.awayTeam.periods[3].score = updateScore(this.liveGameResponse.awayTeam.periods[3].score);
                return this.liveGameResponse;
            }
            } catch (error) {
                console.error(error);
            }
        }
    }
