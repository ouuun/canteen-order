import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Table } from '@model/model/table/table/table.model';
import { WechatService } from '@utils/utils/wechat/wechat.service';
import { LogHelper } from '@model/model/log/log/log-helper';
import { LOG_ACTION } from '@model/model/log/log/log.interface';
import * as fs from 'fs';

@Injectable()
export class TableService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
    private readonly wechatService: WechatService,
  ) {}

  public async addTable(name: string, operId: number): Promise<Table> {
    const table = await Table.build({ name: name });

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(operId, t);
      options.log.request.action = LOG_ACTION.add;
      options.log.request.note = '新增餐桌';
      await table.save(options);
    });
    return table;
  }

  public async getTable(query: any): Promise<Table> {
    const table = await Table.findOne({ where: { name: query.name } });
    if (table) return table;

    const t = await this.addTable(query.name, query.operId);
    const scene = `tableId=${t.id}`;
    const page = 'pages/ordering/index/index';
    const imgBuffer = await this.wechatService.creataQrCode(scene, page);

    await fs.writeFileSync(
      `/var/images/qrCode/table_${t.id}.png`,
      Buffer.from(imgBuffer),
    );

    await this.sequelize.transaction(async (tran) => {
      const options = await LogHelper.buildOptions(query.operId, tran);
      options.log.request.action = LOG_ACTION.update;
      options.log.request.note = '新增餐桌';
      t.qrCode = `https://www.fanjiaming.top/images/qrCode/table_${t.id}.png`;
      await t.save(options);
    });
    return t;
  }

  public async getName(query: any): Promise<Table> {
    return await Table.findOne({ where: { id: query.id } });
  }
}
