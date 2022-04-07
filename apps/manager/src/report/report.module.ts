import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportModule as reportModule } from '@model/model/report/report.module';

@Module({
  imports: [reportModule],
  controllers: [ReportController],
  providers: [],
})
export class ReportModule {
  //
}
