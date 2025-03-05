import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      //eslint-disable-next-line
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017', //NOTE. env 파일이 없다면, 자동으로 로컬과 연결 시도
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//           uri: configService.get<string>('MONGO_URI'),
//           dbName: configService.get<string>('MONGO_DB')
//       })
//   }),
//   ConfigModule.forRoot({
//     // 전역적으로 nestjs configuration 사용
//       isGlobal: true,
//   }),
//   // ---------------------------------------------------------
//   UserModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
