import { GetProfileBentoService } from '@application/services/get-profile-bento.service';
import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class GetProfileBentoController {
  constructor(private readonly getProfileBentoService: GetProfileBentoService) {}

  @Get()
  @ApiOperation({ summary: 'Get profile bento' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile bento retrieved',
  })
  async handle() {
    return this.getProfileBentoService.execute();
  }
}