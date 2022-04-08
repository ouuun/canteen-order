import { Controller, Get, Query, Req } from '@nestjs/common';
import { ReportService } from '@model/model/report/report.service';

@Controller('api/manager/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {
    //
  }

  @Get('day')
  async getDay(@Query() query: any, @Req() request: any): Promise<any> {
    return await this.reportService.toDay();
  }

  @Get('history')
  async history(@Query() query: any, @Req() request: any): Promise<any> {
    return await this.reportService.history();
  }
}
