import { Module } from '@nestjs/common';
import { ConfigModule } from '@utils/utils/config/config.module';
import { ConfigService } from '@utils/utils/config/config.service';
import { SequelizeModule as sequelize } from '@nestjs/sequelize';

@Module({
  imports: [
    sequelize.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'connection',
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.db.host,
        port: +config.db.port,
        username: config.db.user,
        password: config.db.password,
        database: config.db.database,
        autoLoadModels: true,
        synchronize: false,
        logging: false,
        dialectOptions: { decimalNumbers: true },
        pool: { max: 10 },
      }),
    }),
  ],
  // providers: [Logger],
})
export class mySequelizeModule {
  //
}
