import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { TableService } from '@model/model/table/table/table.service';
import { Public } from '@utils/utils/auth/public.metadata';
import { Table } from '@model/model/table/table/table.model';

@Controller('api/manager/table')
export class TableController {
  constructor(private readonly tableService: TableService) {
    //
  }

  @Get('get')
  async get(@Query() query: any, @Req() request: any): Promise<Table> {
    const user = request.user;
    return await this.tableService.getTable(
      Object.assign({}, query, { operId: user.id }),
    );
  }

  @Get('getName')
  @Public()
  async getName(@Query() query: any, @Req() request: any): Promise<Table> {
    return await this.tableService.getName(query);
  }
}
