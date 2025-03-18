import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class GetProfileBentoHttpClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async handle() {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.configService.get<string>('USER_TOKEN_SECRET')}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await firstValueFrom(
      this.httpService.get('/api/v1/users/profile', requestConfig).pipe(
        catchError((error: AxiosError) => {
          if (error.response) {
            if (error.response.data && error.response.data['errors']) {
              const errorDetails = error.response.data;

              throw new HttpException(
                {
                  detail: errorDetails['errors'],
                  code: errorDetails['code'],
                  title: errorDetails['title'],
                  message: errorDetails['detail'],
                },
                error.response.status,
                { cause: error },
              );
            }
          }

          throw error;
        }),
      ),
    );

    return data;
  }
}
