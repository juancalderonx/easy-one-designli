import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SesService } from './ses.service';
import { SesTransformedDto } from './dto/ses-transformed.dto';
import { SesSnsEvent } from './dto/create-ses.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('ses')
@ApiTags('SesSnsEvent')
export class SesController {
  constructor(private readonly sesService: SesService) {}

  @Post('transform-ses-sns-event')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully mapped.',
    type: SesTransformedDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, check logs.',
  })
  @HttpCode(HttpStatus.OK)
  async transformSesSnsEvent(
    @Body() input: SesSnsEvent,
  ): Promise<SesTransformedDto> {
    return await this.sesService.transformSesSnsEvent(input);
  }
}
