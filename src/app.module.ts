import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// import { BoxScoreModule } from '@boxscoreModule';
// import { BoxScoreService } from '@boxscoreService';
import { HttpModule } from '@nestjs/axios';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
    }),
    // BoxScoreModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, 
    // BoxScoreService
  ],
})
export class AppModule {}
