import { Module } from '@nestjs/common';
import { SesModule } from './ses/ses.module';

@Module({
  imports: [SesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
