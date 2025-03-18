import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './env.validation';
import { HttpModule } from '@nestjs/axios';
import { GetProfileBentoController } from '@web/controllers/get-profile-bento.controller';
import { GetProfileBentoService } from '@application/services/get-profile-bento.service';
import { GetProfileBentoHttpClientService } from '@infrastructure/http-clients/get-profile-bento-http-client.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.getOrThrow('API_DELIVERY_URL'),
        responseType: 'json',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GetProfileBentoController],
  providers: [GetProfileBentoService, GetProfileBentoHttpClientService],
})
export class AppModule {}
