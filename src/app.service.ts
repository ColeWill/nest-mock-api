import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Please navigate to /graphql or /api!ga .';
  }
}
