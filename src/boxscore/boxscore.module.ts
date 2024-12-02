import { Module } from '@nestjs/common';
import { BoxScoreService } from './boxscore.service'; 
import { HttpModule } from '@nestjs/axios';
import { BoxScoreResolver, GameResolver } from './boxscore.resolver';
@Module({
  imports: [HttpModule],
  providers: [BoxScoreService, BoxScoreResolver, GameResolver]
})
export class BoxScoreModule {}
