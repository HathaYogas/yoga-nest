import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    HealthModule,
    ConfigModule.forRoot({
      // 전역적으로 nestjs configuration 사용
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      //eslint-disable-next-line
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017', // env 파일이 없다면, 자동으로 로컬과 연결 시도
        dbName: configService.get<string>('MONGO_DB'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
