import { GetProfileBentoService } from '@application/services/get-profile-bento.service';
import { Controller, Get, Headers, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class GetProfileBentoController {
  constructor(
    private readonly getProfileBentoService: GetProfileBentoService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get profile bento' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile bento retrieved',
  })
  @ApiBearerAuth()
  async handle(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.getProfileBentoService.execute(token);
  }
}
