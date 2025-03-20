import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { DeliveryFeeResponseDto } from '@web/dto/delivery-fee.dto';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class GetProfileBentoHttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async handle(authHeader: string): Promise<DeliveryFeeResponseDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authHeader}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await firstValueFrom(
      this.httpService
        .get<DeliveryFeeResponseDto>('/api/v1/users/profile', requestConfig)
        .pipe(
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
