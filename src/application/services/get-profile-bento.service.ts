import { HttpException, Inject, Injectable } from '@nestjs/common';
import { GetProfileBentoHttpClientService } from '@infrastructure/http-clients/get-profile-bento-http-client.service';

@Injectable()
export class GetProfileBentoService {
  constructor(private readonly getProfileBentoHttpClient: GetProfileBentoHttpClientService) {}

  async execute() {
    try {
      return this.getProfileBentoHttpClient.handle();
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}