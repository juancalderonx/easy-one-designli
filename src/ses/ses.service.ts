import { Injectable } from '@nestjs/common';
import { SesSnsEvent } from './dto/create-ses.dto';
import { SesTransformedDto } from './dto/ses-transformed.dto';
import { SesReceiptData } from './classes/ses-classes';

@Injectable()
export class SesService {
  /**
   * Map the information of the SesSnsEvent object to a SesTransformedDto object.
   * @param input SesSnsEvent object.
   * @returns SesTransformedDto object.
   */
  async transformSesSnsEvent(input: SesSnsEvent): Promise<SesTransformedDto> {
    const record = input.Records[0].ses.receipt;

    const transformedData: SesTransformedDto = {
      spam: record.spamVerdict.status === 'PASS',
      virus: record.virusVerdict.status === 'PASS',
      dns: this.allVerdictsPassed(record),
      mes: this.getMonthFromTimestamp(input.Records[0].ses.mail.timestamp),
      retrasado: record.processingTimeMillis > 1000,
      emisor: this.getUsernameFromEmail(input.Records[0].ses.mail.source),
      receptor: input.Records[0].ses.mail.destination.map((email) =>
        this.getUsernameFromEmail(email),
      ),
    };

    return transformedData;
  }

  /**
   * Check if all the verdicts of the email are passed.
   * @param receipt SesReceiptData object.
   * @returns true if all the verdicts are passed, false otherwise.
   */
  private allVerdictsPassed(receipt: SesReceiptData): boolean {
    return (
      receipt.spfVerdict.status === 'PASS' &&
      receipt.dkimVerdict.status === 'PASS' &&
      receipt.dmarcVerdict.status === 'PASS'
    );
  }

  /**
   * Get the month from a timestamp.
   * @param timestamp Timestamp obtained from the email.
   * @returns Month of the timestamp.
   */
  private getMonthFromTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString('default', { month: 'long' });
  }

  /**
   * Get the username from an email.
   * @param email Email.
   * @returns Username.
   */
  private getUsernameFromEmail(email: string): string {
    return email.split('@')[0];
  }
}
