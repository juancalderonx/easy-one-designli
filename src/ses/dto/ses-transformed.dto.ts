import { ApiProperty } from '@nestjs/swagger';

export class SesTransformedDto {
  @ApiProperty({
    description: 'Property that define if the email is spam or not',
    type: Boolean,
  })
  spam: boolean;

  @ApiProperty({
    description: 'Property that define if the email has a virus or not',
    type: Boolean,
  })
  virus: boolean;

  @ApiProperty({
    description:
      'Property that defines if all DNS verifications (SPF, DKIM, DMARC) passed',
    type: Boolean,
  })
  dns: boolean;

  @ApiProperty({
    description: 'Month extracted from mail timestamp as text',
    type: String,
  })
  mes: string;

  @ApiProperty({
    description:
      'Property that defines if the email processing time is delayed (>1000ms)',
    type: Boolean,
  })
  retrasado: boolean;

  @ApiProperty({
    description: 'Username extracted from mail source without domain',
    type: String,
  })
  emisor: string;

  @ApiProperty({
    description: 'Usernames extracted from mail destination without domain',
    isArray: true,
    type: String,
  })
  receptor: string[];
}
