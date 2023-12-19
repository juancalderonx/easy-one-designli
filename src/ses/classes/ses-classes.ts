import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SesVerdict {
  @ApiProperty({ description: 'Verdict status' })
  @IsString()
  status: string;
}

export class SesAction {
  @ApiProperty({ description: 'Action type' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Topic ARN' })
  @IsString()
  topicArn: string;
}

export class SesMailHeadersData {
  @ApiProperty({ description: 'Header name as a string' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Header value as a string' })
  @IsString()
  value: string;
}

export class SesMailCommonHeadersData {
  @ApiProperty({ description: 'Return path as a string' })
  @IsString()
  returnPath: string;

  @ApiProperty({
    description: 'Array of sender email addresses',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  from: string[];

  @ApiProperty({ description: 'Date as a string' })
  @IsString()
  date: string;

  @ApiProperty({
    description: 'Array of recipient email addresses',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  to: string[];

  @ApiProperty({ description: 'Message ID as a string' })
  @IsString()
  messageId: string;

  @ApiProperty({ description: 'Subject as a string' })
  @IsString()
  subject: string;
}

export class SesReceiptData {
  @ApiProperty({ description: 'Receipt timestamp as a string' })
  @IsString()
  timestamp: string;

  @ApiProperty({ description: 'Processing time in milliseconds' })
  @IsNumber()
  processingTimeMillis: number;

  @ApiProperty({
    description: 'Array of recipient email addresses',
    type: [String],
  })
  @IsString({ each: true })
  recipients: string[];

  @ApiProperty({
    description: 'Spam verdict status',
    type: () => SesVerdict,
  })
  @ValidateNested()
  spamVerdict: SesVerdict;

  @ApiProperty({
    description: 'Virus verdict status',
    type: () => SesVerdict,
  })
  @ValidateNested()
  virusVerdict: SesVerdict;

  @ApiProperty({
    description: 'SPF verdict status',
    type: () => SesVerdict,
  })
  @ValidateNested()
  spfVerdict: SesVerdict;

  @ApiProperty({
    description: 'DKIM verdict status',
    type: () => SesVerdict,
  })
  @ValidateNested()
  dkimVerdict: SesVerdict;

  @ApiProperty({
    description: 'DMARC verdict status',
    type: () => SesVerdict,
  })
  @ValidateNested()
  dmarcVerdict: SesVerdict;

  @ApiProperty({ description: 'DMARC policy' })
  @IsString()
  dmarcPolicy: string;

  @ApiProperty({ description: 'Action details' })
  @ValidateNested()
  action: SesAction;
}

export class SesMailData {
  @ApiProperty({ description: 'Mail timestamp as a string' })
  @IsString()
  timestamp: string;

  @ApiProperty({ description: 'Source email address' })
  @IsString()
  source: string;

  @ApiProperty({ description: 'Unique identifier for the message' })
  @IsString()
  messageId: string;

  @ApiProperty({
    description: 'Array of destination email addresses',
    type: [String],
  })
  @IsString({ each: true })
  destination: string[];

  @ApiProperty({ description: 'Flag indicating if headers are truncated' })
  @IsBoolean()
  headersTruncated: boolean;

  @ApiProperty({ description: 'Array of mail headers' })
  @ValidateNested({ each: true })
  headers: SesMailHeadersData[];

  @ApiProperty({ description: 'Common mail headers data' })
  @ValidateNested()
  commonHeaders: SesMailCommonHeadersData;
}

export class SesData {
  @ApiProperty({ description: 'Receipt data', type: SesReceiptData })
  @ValidateNested()
  receipt: SesReceiptData;

  @ApiProperty({ description: 'Mail data', type: SesMailData })
  @ValidateNested()
  mail: SesMailData;
}

export class RecordData {
  @ApiProperty({ description: 'Event version as a string' })
  @IsString()
  eventVersion: string;

  @ApiProperty({ description: 'SesSnsEvent data', type: SesData })
  @ValidateNested()
  ses: SesData;

  @ApiProperty({ description: 'Event source as a string' })
  @IsString()
  eventSource: string;
}
