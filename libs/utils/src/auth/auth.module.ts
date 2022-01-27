import { Module } from '@nestjs/common';
import { JwtStrategy } from '@utils/utils/auth/jwt.strategy';
import { UtilsModule } from '@utils/utils';
import { AuthService } from '@utils/utils/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@utils/utils/config/config.service';
import { ConfigModule } from '@utils/utils/config/config.module';

@Module({
  imports: [
    UtilsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.jwt.secret,
          signOptions: { expiresIn: config.jwt.signOptions.expiresIn },
        };
      },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
