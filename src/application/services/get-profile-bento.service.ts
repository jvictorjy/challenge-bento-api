import { GetProfileBentoHttpClientService } from '@infrastructure/http-clients/get-profile-bento-http-client.service';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class GetProfileBentoService {
  constructor(
    private readonly getProfileBentoHttpClient: GetProfileBentoHttpClientService,
  ) {}

  async execute(authHeader: string) {
    try {
      return this.getProfileBentoHttpClient.handle(authHeader);
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
