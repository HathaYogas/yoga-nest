import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017'),
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
